const express = require('express');

const router = express.Router();

const { wishlistCreation, getWishlist, updateWishlist, deletewhishlist } = require("../controllers/wishListController")

const { verifyTokenAndAuthorization } =require("../middleware/middleware")

// Cart APIs

router.route("/users/:userId/wishlist").post(verifyTokenAndAuthorization, wishlistCreation)

router.route("/users/:userId/wishlist").put(verifyTokenAndAuthorization, updateWishlist)

router.route("/users/:userId/wishlist").get(verifyTokenAndAuthorization, getWishlist)

router.route("/users/:userId/wishlist").delete(verifyTokenAndAuthorization, deletewhishlist)


//if api is invalid OR wrong URL

router.all("/**", function (req, res) {
  
    return res.render('error', { downloadLink: `${process.env.BASE_URL}` });

})


module.exports = router;