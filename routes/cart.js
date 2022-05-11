const express = require("express");
const router = express.Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../utils/jwtToken");

const {
  cartcreate,
  Cartupdate,
  Deletecart,
  Usercart,
  allusercart,
  
} = require("../controllers/cartcontroller");

// Route for add products in cart
// Login user Feature

router.route("/addcart").post(verifyToken, cartcreate);

// Route for display user Details
// Login user Feature

router.route("/cartdetails/:userId").get(verifyToken, Usercart);

// Route for delete a cart item
// Login user Feature

router.route("/deletecart/:id").delete(verifyToken, Deletecart);

// Route for display all user Cart
// Admin features

router.route("/").get(verifyTokenAndAdmin, allusercart);

// Route for update cart
// Admin Features

router.route("/cartupdate/:id").put( verifyToken, Cartupdate);


module.exports = router;
