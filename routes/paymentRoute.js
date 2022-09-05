const express = require('express');

const router = express.Router();

const { webhook, generatepayement } = require("../controllers/PaymentController")

const { verifyTokenAndAuthorization } =require("../middleware/middleware")

const create = require("../controllers/orderController")

router.route("/create-checkout-session/:userId").post(verifyTokenAndAuthorization,generatepayement);



// Stripe webhoook

router.post("/webhook", express.json({ type: "application/json" }), (async (req, res) => {
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
                        create.createOrder(customer, data);
                    } catch (err) {
                        console.log(typeof createOrder);
                        console.log(err);
                    }
                })
                .catch((err) => console.log(err.message));
        }

        res.status(200).end();
    }
}));

module.exports = router;