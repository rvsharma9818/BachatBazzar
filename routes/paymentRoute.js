const express = require('express');

const router = express.Router();

const { webhook, generatepayement } = require("../controllers/PaymentController")

const { verifyTokenAndAuthorization } =require("../middleware/middleware")


router.route("/create-checkout-session/:userId").post(verifyTokenAndAuthorization,generatepayement);



// Stripe webhoook

router.post("/webhook", express.json({ type: "application/json" }), webhook);

module.exports = router;