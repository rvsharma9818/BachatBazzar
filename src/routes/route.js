const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const {upload} = require("../AWS/s3")
const {verifyToken,verifyTokenAndAuthorization } =require("../middleware/auth")

// User APIs
router.post("/register",upload.single('profileImage'), userController.createUser)

router.post("/login", userController.loginUser)

router.get("/user/:userId/profile",verifyToken, userController.userProfile)

router.put("/user/:userId/profile", verifyTokenAndAuthorization,upload.single('profileImage'),userController.updateUserDetails)


//if api is invalid OR wrong URL
router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        message: "The api you request is not available"
    })
})

module.exports = router;