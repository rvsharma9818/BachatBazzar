require("dotenv").config();

const Stripe = require("stripe")(process.env.STRIPE_KEY);


const CartModel = require("../models/cartModel")

const { createOrder } = require("./orderController")




exports.generatepayement = (async (req, res) => {
    try {
        const Cart = await CartModel.findOne({ userId: req.params.userId }).populate("items.productId").select({ description: 0 })
        const customer = await Stripe.customers.create({
            metadata: {
                userId: req.params.userId,
            },
        });
        if (!Cart.items.length) {
            return res.status(404).send({ status: false, message: `Add Product in cart to make an Order.` });
        }
        const line_items = Object.values(Cart.items).map((item) => {
            return {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: item.productId.title,
                        images: [item.productId.productImage],
                        metadata: {
                            id: item.productId._id,
                        },
                    },
                    unit_amount: item.productId.price * 100,
                },
                quantity: item.quantity,
            };
        });

        const session = await Stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            shipping_address_collection: {
                allowed_countries: ["IN"],
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: "fixed_amount",
                        fixed_amount: {
                            amount: 0,
                            currency: "inr",
                        },
                        display_name: "Free shipping",
                        // Delivers between 5-7 business days
                        delivery_estimate: {
                            minimum: {
                                unit: "business_day",
                                value: 5,
                            },
                            maximum: {
                                unit: "business_day",
                                value: 7,
                            },
                        },
                    },
                },
                {
                    shipping_rate_data: {
                        type: "fixed_amount",
                        fixed_amount: {
                            amount: 1500,
                            currency: "inr",
                        },
                        display_name: "Next day air",
                        // Delivers in exactly 1 business day
                        delivery_estimate: {
                            minimum: {
                                unit: "business_day",
                                value: 1,
                            },
                            maximum: {
                                unit: "business_day",
                                value: 1,
                            },
                        },
                    },
                },
            ],
            phone_number_collection: {
                enabled: true,
            },
            line_items,
            mode: "payment",
            customer: customer.id,
            success_url: `http://localhost:3000/checkout-success`,
            cancel_url: `http://localhost:3000/cart`,
        });

        // res.redirect(303, session.url); 
        res.send({ url: session.url });
    } catch (err) {
        return res.send(err)
    }
})


exports.webhook = (async (req, res) => {
    async (req, res) => {
        let data;
        let eventType;

        // Check if webhook signing is configured.
        let webhookSecret;
        //webhookSecret = process.env.STRIPE_WEB_HOOK;

        if (webhookSecret) {
            // Retrieve the event by verifying the signature using the raw body and secret.
            let event;
            let signature = req.headers["stripe-signature"];

            try {
                event = Stripe.webhooks.constructEvent(
                    req.body,
                    signature,
                    webhookSecret
                );

            } catch (err) {
                console.log(`⚠️  Webhook signature verification failed:  ${err}`);
                return res.sendStatus(400);
            }
            data = event.data.object;
            eventType = event.type;
        } else {
            data = req.body.data.object;
            eventType = req.body.type;
        }

        if (eventType === "checkout.session.completed") {
            Stripe.customers
                .retrieve(data.customer)
                .then(async (customer) => {
                    try {
                        // CREATE ORDER
                        createOrder(customer, data);
                    } catch (err) {
                        console.log(typeof createOrder);
                        console.log(err);
                    }
                })
                .catch((err) => console.log(err.message));
        }

        res.status(200).end();
    }
})