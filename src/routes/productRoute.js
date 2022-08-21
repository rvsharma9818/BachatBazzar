const express = require('express');

const router = express.Router();


const {upload} = require("../AWS/s3")

const { verifyTokenAndAdmin } =require("../middleware/auth")

const {updateProduct, createProduct, getProduct, getProductById, deleteProductById} = require('../controllers/productController')


// Product APIs

router.route("/products/:userId").post(upload.single('productImage'),verifyTokenAndAdmin,createProduct)

router.route("/products").get(getProduct) 

router.route("/products/:productId").get(getProductById) 

router.route("/products/:userId/:productId").put(upload.single('productImage'),verifyTokenAndAdmin ,updateProduct) 

router.route("/products/:userId/:productId").delete(verifyTokenAndAdmin,deleteProductById) 



//if api is invalid OR wrong URL
router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        message: "The api you request is not available"
    })
})


module.exports = router;

