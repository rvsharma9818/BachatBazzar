const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const {cartCreation, getCart, updateCart, deleteCart} = require("../controllers/cartController")
const {orderCreation, updateOrder} = require("../controllers/orderController")
const {upload} = require("../AWS/s3")
const { verifyTokenAndAuthorization } =require("../middleware/auth")
const {updateProduct, createProduct, getProduct, getProductById, deleteProductById} = require('../controllers/productController')

//===========================================================================================================

// User APIs
router.route("/register").post(upload.single('profileImage'), userController.createUser)

router.route("/login").post( userController.loginUser)

router.route("/user/:userId/profile").get(verifyTokenAndAuthorization, userController.userProfile)

router.route("/user/:userId/profile").put(upload.single('profileImage'),verifyTokenAndAuthorization,userController.updateUserDetails)

//===========================================================================================================

// Product APIs
router.route("/products").post(upload.single('productImage'),createProduct)

router.route("/products").get(getProduct) 

router.route("/products/:productId").get(getProductById) 

router.route("/products/:productId").put(upload.single('productImage'),updateProduct) 

router.route("/products/:productId").delete(deleteProductById) 

//===========================================================================================================

// Cart APIs
router.route("/users/:userId/cart").post(verifyTokenAndAuthorization, cartCreation)

router.route("/users/:userId/cart").put(verifyTokenAndAuthorization, updateCart)

router.route("/users/:userId/cart").get(verifyTokenAndAuthorization, getCart)

router.route("/users/:userId/cart").delete(verifyTokenAndAuthorization, deleteCart)

//===========================================================================================================

//Order APIs
router.route("/users/:userId/orders").post(verifyTokenAndAuthorization, orderCreation)

router.route("/users/:userId/orders").put(verifyTokenAndAuthorization, updateOrder)

//===========================================================================================================

//if api is invalid OR wrong URL
router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        message: "The api you request is not available"
    })
})

//===========================================================================================================

module.exports = router;

//===========================================================================================================