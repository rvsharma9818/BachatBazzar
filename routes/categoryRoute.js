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
  
    return res.render('error', { downloadLink: `${process.env.BASE_URL}` });

})

module.exports = router;
