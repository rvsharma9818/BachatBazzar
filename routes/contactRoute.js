const express = require('express');

const router = express.Router();

const { postcontact , getcontact } = require("../controllers/contactController")

const { verifyTokenAndAuthorization, verifyTokenAndAdmin } =require("../middleware/middleware")


//Contact APIs

router.route("/users/:userId/postcontact").post(verifyTokenAndAuthorization, postcontact)

router.route("/users/:userId/getcontact").get(verifyTokenAndAdmin, getcontact)

//if api is invalid OR wrong URL

router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        message: "The api you request is not available"
    })
})


module.exports = router;
