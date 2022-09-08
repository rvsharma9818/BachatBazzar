const express = require('express');

const router = express.Router();


const {upload} = require("../aws-setup/aws-sdk")

const { verifyTokenAndAdmin } =require("../middleware/middleware")

const {updateProduct, createProduct, getProduct, getProductById, deleteProductById} = require('../controllers/productcontroller')


// Product APIs

router.route("/products/:userId").post(upload.single('productImage'),verifyTokenAndAdmin,createProduct)

router.route("/products").get(getProduct) 

router.route("/products/:productId").get(getProductById) 

router.route("/products/:userId/:productId").put(upload.single('productImage'),verifyTokenAndAdmin ,updateProduct) 

router.route("/products/:userId/:productId").delete(verifyTokenAndAdmin,deleteProductById) 



//if api is invalid OR wrong URL
router.all("/**", function (req, res) {
  
    return res.render('error', { downloadLink: `${process.env.BASE_URL}` });

})


module.exports = router;
