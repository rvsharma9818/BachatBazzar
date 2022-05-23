const Product = require("../models/product.model");
const ErrorHandler = require("../utils/ErrorHandler");
const { CatchAsyncError } = require("../middleware/CatchAsyncError");
const cloudinary = require("../helper/cloudinary");

//Create Product --Admin Feature

exports.createProduct = CatchAsyncError( async (req, res, next) => {
  try { 
    const result = await cloudinary.uploader.upload(req.file.path);
    const product = new Product({
      title: req.body.title,
      desc: req.body.desc,
      price: req.body.price,
      offerprice: req.body.offerprice,
      color: req.body.color,
      size: req.body.size,
      image_id: result.public_id,
      image_url: result.url,
      category: req.body.category,
      stock: req.body.stock,
    });
    await product.save();
    res.status(200).json(product);
    console.log(product);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

//get All Produ8cts

exports.getallproducts = CatchAsyncError(async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update Product --admin Feature

exports.updateProduct = CatchAsyncError(async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    // Delete image from cloudinary
  
    await cloudinary.uploader.destroy(product.image_id);
    // Upload image to cloudinary
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    const data = {
      title: req.body.title || product.title,
      desc: req.body.desc || product.desc,
      price: req.body.price || product.price,
      offerprice: req.body.offerprice || product.offerprice,
      color: req.body.color || product.color,
      size: req.body.size || product.size,
      image_id: result?.public_id || product.image_id,
      image_url: result?.url || product.image_url,
      category: req.body.category || product.category,
      stock: req.body.stock || product.stock,
    };
    product = await Product.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//Delete a Product
exports.deleteProduct = CatchAsyncError(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    await cloudinary.uploader.destroy(product.image_id);
    await product.remove();
    res.status(200).json("delete succesfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

//Single Products Details

exports.getSingleProduct = CatchAsyncError(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product is not found with this id", 404));
    }

    res.status(200).json({
      sucess: true,
      product,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});