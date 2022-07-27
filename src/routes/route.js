const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const {upload} = require("../AWS/s3")
const {verifyToken,verifyTokenAndAuthorization } =require("../middleware/auth")
const {updateProduct,createProduct,getProduct,getProductById,deleteProductById} = require('../controllers/productController')

// User APIs
router.post("/register",upload.single('profileImage'), userController.createUser)

router.post("/login", userController.loginUser)

router.get("/user/:userId/profile",verifyToken, userController.userProfile)

router.route("/user/:userId/profile").put(upload.single('profileImage'),verifyTokenAndAuthorization,userController.updateUserDetails)

router.post("/products",upload.single('productImage'),createProduct) // Arup
router.get("/products",getProduct) // Nil
router.get("/products/:productId",getProductById) // Mubashir
router.put("/products/:productId",upload.single('productImage'),updateProduct) //Chandu
router.delete("/products/:productId",deleteProductById) //Mubashir


//if api is invalid OR wrong URL
router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        message: "The api you request is not available"
    })
})

module.exports = router;