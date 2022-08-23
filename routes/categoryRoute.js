const express = require('express');

const router = express.Router();

const {upload} = require("../aws-setup/aws-sdk")

const { verifyTokenAndAdmin } =require("../middleware/middleware")

const { creatcategory,getCategory,updateCategory,categorybyid,deleteCategory } = require("../controllers/categoryController")


//router for Category

router.route("/category/:userId").post(upload.single("createCategory"),verifyTokenAndAdmin,creatcategory)

router.route("/getcategory").get(getCategory)

router.route("/category/:userId/:catid").get(verifyTokenAndAdmin,categorybyid)

router.route("/updatecategory/:userId/:catid").put(upload.single("createCategory"),verifyTokenAndAdmin,updateCategory)

router.route("/delcategory/:userId/:catid").delete(verifyTokenAndAdmin,deleteCategory)

//if api is invalid OR wrong URL
router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        message: "The api you request is not available"
    })
})


module.exports = router;
