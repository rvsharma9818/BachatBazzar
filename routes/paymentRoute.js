const express = require('express');

const router = express.Router();

const {payement} = require("../controllers/PaymentController.js")

const { verifyTokenAndAuthorization } =require("../middleware/middleware")

// Cart APIs

router.route("/checkout").post(payement)

module.exports=router