const express = require("express");
const router = express.Router();
const {
  createCategory,
  updatecategory,
  deletecategory,
  displaycategory,
} = require("../controllers/category.controller");
const upload = require("../helper/storage");
const { verifyToken,verifyTokenAndAdmin } = require("../utils/jwtToken");

// Route for create a category
// Admin Feature

router
  .route("/uploadcategory")
  .post(upload.single("images"), verifyTokenAndAdmin, createCategory);

// Route for display a category
// public Feature

router.route("/categories").get(displaycategory);

// Route for update a category
// Admin Feature

router
  .route("/updatecategory/:id")
  .put(upload.single("images"), verifyTokenAndAdmin, updatecategory);

// Route for delete a category
// Admin Feature

router.route("/deleteCAtegory/:id").delete(verifyTokenAndAdmin, deletecategory);

module.exports = router;
