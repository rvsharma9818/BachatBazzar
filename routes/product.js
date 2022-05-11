const express = require("express");
const router = express.Router();
const {
  createProduct,
  getallproducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productcontroller");
const upload = require("../helper/storage");
const { verifyTokenAndAdmin ,verifyToken} = require("../utils/jwtToken");
require("dotenv").config({
  path: "./.env",
});

//route for upload a new product
//admin feature

router
  .route("/productupload")
  .post(verifyTokenAndAdmin,upload.single("images"), createProduct);

// Route for display all product
// public feature

router.route("/").get(getallproducts);

// Route display a particular product details
// public feature

router.route("/:id").get(getSingleProduct);

// Route for update a Product details
// admin features

router
  .route("/up/:id").put(verifyTokenAndAdmin, upload.single("images"), updateProduct);

// Route for delete a product
// admin Feature

router.route("/delete/:id").delete(verifyTokenAndAdmin, deleteProduct);

// all routes are exported

module.exports = router;
