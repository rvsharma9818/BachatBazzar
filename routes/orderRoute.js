const express = require('express');

const router = express.Router();

const { orderCreation, updateOrder,getorder,getorderbyid,deleteOrder,getorderUser} = require("../controllers/orderController")

const { verifyTokenAndAuthorization, verifyTokenAndAdmin } =require("../middleware/middleware")


//Order APIs

router.route("/users/:userId/getorder").get(verifyTokenAndAuthorization, getorderUser)

router.route("/users/:userId/getorderbyid").get(verifyTokenAndAuthorization, getorderbyid)

router.route("/users/:userId/getorders").get(verifyTokenAndAdmin, getorder)

router.route("/users/:userId/orders/:orderId").delete(verifyTokenAndAdmin,deleteOrder )

router.route("/users/:userId/orders").put(verifyTokenAndAuthorization, updateOrder)

//if api is invalid OR wrong URL

router.all("/**", function (req, res) {
  
    return res.render('error', { downloadLink: `${process.env.BASE_URL}` });

})

module.exports = router;
