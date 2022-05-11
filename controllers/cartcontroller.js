const Cart = require("../models/cart.model");
const { CatchAsyncError } = require("../middleware/CatchAsyncError");

// saved a user car details

exports.cartcreate = CatchAsyncError(async (req, res, next) => {
  try {
    const newCart = new Cart({
      userId:req.body.userId,
      productId:req.body.productId,
      productTitle:req.body.productTitle,
      productimage:req.body.productimage,
      productSize:req.body.productSize,
      quantity:req.body.quantity
    });
    await newCart.save();
    res.status(200).json(newCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

// cart update by user

exports.Cartupdate = CatchAsyncError(async (req, res, next) => {
  try {
    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete a user

exports.Deletecart = CatchAsyncError(async (req, res, next) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("cart deleted succesfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

//get user cart

exports.Usercart = CatchAsyncError(async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
});

// all user cart

exports.allusercart = CatchAsyncError(async (req, res,) => {
  try {
    res.status(200).json('uyhvjvjhc');
  } catch (error) {
    res.status(500).json(error);
  }
});
