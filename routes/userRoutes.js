const express = require('express');
const router = express.Router();
const userController = require("../controllers/usercontroller")

const {upload} = require("../aws-setup/aws-sdk")

const { verifyTokenAndAuthorization } =require("../middleware/middleware")

//===========================================================================================================

// User APIs
router.route("/register").post(upload.single('profile'), userController.createUser)

router.route("/login").post( userController.loginUser)

router.route("/user/:userId/profile").get(verifyTokenAndAuthorization, userController.userProfile)

router.route("/user/:userId/profile").put(upload.single('profile'),verifyTokenAndAuthorization,userController.updateUserDetails)

//if api is invalid OR wrong URL
router.all("/**", function (req, res) {
  
    return res.render('error', { downloadLink: `${process.env.BASE_URL}` });

})

//===========================================================================================================

module.exports = router;

//===========================================================================================================