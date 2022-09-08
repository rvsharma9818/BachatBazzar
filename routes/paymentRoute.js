const express = require('express');

const router = express.Router();

const {  generatepayement } = require("../controllers/PaymentController")

const { verifyTokenAndAuthorization } =require("../middleware/middleware")

require("dotenv").config();

const Stripe = require("stripe")(process.env.STRIPE_KEY);

const CartModel = require("../models/cartModel")

const orderModel = require("../models/orderModel");

router.route("/create-checkout-session/:userId").post(verifyTokenAndAuthorization,generatepayement);


const createOrder = async (customer, data) => {

    try {

        const Cart = await CartModel.findOne({ userId: "6304e0b32c6028d3bd050a52" }).populate("items.productId").select({ description: 0 })


        const products = Cart.items.map((item) => {

            return {

                productId: item.productId._id,

                quantity: item.quantity,

            };

        });

        const newOrder = {
            userId: customer.metadata.userId,
            customerId: data.customer,
            orderId: Math.floor(Math.random() * 1000000),
            transactionId: data.payment_intent,
            products,
            subtotal: data.amount_subtotal,
            total: data.amount_total,
            shipping: data.customer_details,
            payment_status: data.payment_status,
        };

        await CartModel.findOneAndUpdate({ userId: customer.metadata.userId }, {
            $set: {
                items: [],
                totalPrice: 0,
                totalItems: 0,
            },
        })

        const savedOrder = await orderModel.create(newOrder);

        const sendMail = require('../Email-setup/emailservices');

        sendMail({
            to: savedOrder.shipping.email,
            
            subject: 'Order is Succesfully placed',
            
            html: require('../Email-setup/emailTemplate')({
            
                title: "Your Order is Succesfully placed",
            
                name: savedOrder.shipping.name,
            
                orderId: savedOrder.orderId,
            
                total: savedOrder.subtotal,
            
                status: "Pending",
            
                items: savedOrder.total,
            
                transcation: savedOrder.transactionId
            })
        })
            
        .then(() => {
        
            return ({ success: true });
        
        })
        
        .catch(err => {
        
    
            console.log(err)
    
    });
    
} catch (err) {

    console.log(err);

}

};

// Stripe webhoook


router.post("/webhook", express.json({ type: "application/json" }), async (req, res) => {

    let data;

    let eventType;


    let webhookSecret;


    
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
        }
         else {
        
            data = req.body.data.object;
        
            eventType = req.body.type;
        }

        
        if (eventType === "checkout.session.completed") {
        
            Stripe.customers.retrieve(data.customer).then(async (customer) => {
                    
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
);

router.all("/**", function (req, res) {
  
    return res.render('error', { downloadLink: `${process.env.BASE_URL}` });

})
module.exports = router;