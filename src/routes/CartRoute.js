const express = require('express');

const router = express.Router();

const {cartCreation, getCart, updateCart, deleteCart} = require("../controllers/cartController")

const { verifyTokenAndAuthorization } =require("../middleware/auth")

// Cart APIs

router.route("/users/:userId/cart").post(verifyTokenAndAuthorization, cartCreation)

router.route("/users/:userId/cart").put(verifyTokenAndAuthorization, updateCart)

router.route("/users/:userId/cart").get(verifyTokenAndAuthorization, getCart)

router.route("/users/:userId/cart").delete(verifyTokenAndAuthorization, deleteCart)


//if api is invalid OR wrong URL
router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        message: "The api you request is not available"
    })
})


module.exports = router;
