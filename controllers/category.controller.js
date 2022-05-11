const Category = require("../models/category.model");
const cloudinary = require("../helper/cloudinary");
const { CatchAsyncError } = require("../middleware/CatchAsyncError");

exports.createCategory = CatchAsyncError(async (req, res, next) => {
  try {
    const category = await Category.findOne({ title: req.body.title });
    if (category) {
      res.status(401).json("Category already exist");
    }
    const result = await cloudinary.uploader.upload(req.file.path);
    const newCategory = new Category({
      title: req.body.title,
      images_url: result.url,
      images_id: result.public_id,
    });
    await newCategory.save();
    res.status(200).json(newCategory);
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
});

exports.displaycategory = CatchAsyncError(async (req, res) => {
  try {
    const category = await Category.find(req.body)
    console.log(category)
    res.status(200).json(category);
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
});



exports.updatecategory = CatchAsyncError(async (req, res) => {
  try {
    let  category = await Category.findOne(req.param.id);
    console.log(category);
    await cloudinary.uploader.destroy(category.images_id);
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    const data = {
      title: req.body.title || category.title,
      images_id: result?.public_id || category.images_id,
      images_url: result?.url || category.images_url,
    };
    category = await Category.findByIdAndUpdate(req.params.id, data, { new: true});
    res.status(200).json(category);
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
});
exports.deletecategory = CatchAsyncError(async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    await cloudinary.uploader.destroy(category.images_id);
    await category.remove();
    res.status(200).json("delete succesfully");
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
});
