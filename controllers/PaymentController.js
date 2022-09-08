require("dotenv").config();

const Stripe = require("stripe")(process.env.STRIPE_KEY);

const CartModel = require("../models/cartModel")





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
        
            success_url: `${process.env.BASE_URL}`,
            
            cancel_url: `${process.env.BASE_URL}/fail`,
        
        });

        return res.send({ url: session.url });

    } catch (err) {

        return res.send('Something Went Wrong')

    }

})


