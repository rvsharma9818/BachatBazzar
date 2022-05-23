const express = require("express");
const router = express.Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../utils/jwtToken");

const {
  orderCreate,
  deleteOrder,
  updateorder,
  userdeleteOrder,
  monthlyincome,
  getuserorder,
  alluserorder,
} = require("../controllers/ordercontroller");

// Route for store succesfully placed order
// Login user Feature

router.route("/ordercart").post(verifyToken, orderCreate);

// Route for display userorder
// Login user Feature

router.route("/orderdetails/:userId").get(verifyTokenAndAuthorization, getuserorder);

// Route for delete a order by admin
// Admin user Feature

router.route("/deleteorder/:id").delete(verifyTokenAndAdmin, deleteOrder);

// Route for delete a user order
// Login user Feature

router.route("/userdeleteorder/:id").delete(verifyTokenAndAuthorization, userdeleteOrder);

// Route for display all userorder
// Admin features

router.route("/order/").get(verifyTokenAndAdmin, alluserorder);

// Route for display monthly income
// Admin Features

router.route("/monthlyincome").get(verifyTokenAndAdmin, monthlyincome);

module.exports = router;
