const express = require("express");
const router = express.Router();

const {
  createUser,
  getAllUsers,
  getSingleUser,
  updateProfile,
  deleteUser,
  LoginUser,
} = require("../controllers/usercontroller");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../utils/jwtToken");
const uploads = require("../helper/storage");

// Route for regestration a new user
//public feature
router.route("/registration").post(uploads.single("avatar"), createUser);

//Route for login by user
// public fetaure

router.route("/login").post(LoginUser);

//Route for display a user details
//Login user Feature

router.route("/userdetail/:id").get(verifyTokenAndAuthorization, getSingleUser);

//Route for display all user details
//Admin feature

router.route("/alluser").get(verifyTokenAndAdmin, getAllUsers);

//route for delete a user
//Admin Feature

router.route("/userdelete/:id").delete(verifyTokenAndAuthorization, deleteUser);

// Route for update user
// Login user feature

router
  .route("/update/:id")
  .put(verifyTokenAndAuthorization, uploads.single("avatar"), updateProfile);

module.exports = router;
