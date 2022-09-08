const category = require("../models/categoryModel");

exports.creatcategory = async (req, res) => {
 
  try {
 
    let data = req.body;

 
    const { title } = data;


    let file = req.file;

    if (!file) {
 
      return res.status(400).send({ status: false, error: "categoryImage is complusary" });
    
    }
    
    data["categoryImage"] = req.file.location;

    
    let cat = await category.create(data);

    return res.status(201).send({ status: true, data: cat });
  } 
  catch (error) {
  
    return res.status(500).send({ status: false, error:'Something Went Wrong' });
  
  }

};

exports.getCategory = async (req, res) => {
  try {
    
    let Category = await category.find({ isDeleted: false });

    if (!Category) {
    
      return res.status(400).send({ status: false, error: "No category exist" });
    
    }

    
    return res.status(200).send({ status: true, data: Category });
  
  } catch (error) {
  
    return res.status(500).send({ status: false, error: 'Something Went Wrong' });
  
  }

};

exports.categorybyid = async (req, res) => {
  try {
    let catid = req.params.catid;
  
    let cat = await category.findOne({ _id: catid, isDeleted: false });

  
    if (!cat) {
  
      return res.status(400).send({ status: false, error: "Category Dosen't exist" });
    
    }

    
    return res.status(200).send({ status: true, data: cat });
  
  } catch (error) {
  
    return res.status(500).send({ status: false, error: 'Something Went Wrong' });
  
  }

};

exports.updateCategory = async (req, res) => {

  try {

    let data = req.body;

    let file = req.file;

    let catid = req.params.catid;

    let cat = await category.findOne({ _id: catid, isDeleted: false });

    if (!cat) {

      return res.status(400).send({ status: false, error: "Category Dosen't exist" });}

    const {title}=data

    let updated = {};

    if (title) {
      
      updated["title"] = req.body.title;
    
    }
    
    if (req.file) {
    
      updated["categoryImage"] = req.file.location;
    
    }
    
    let catk = await category.findOneAndUpdate({ _id: catid }, updated, {
    
      new: true,
    
    });

    return res.status(200).send({ status: true, msg: "Updated Sucessfully", data: catk });
  } catch (error) {
  
    return res.status(500).send({ status: false, error: error.message });
  
  }

};

exports.deleteCategory = async (req, res) => {

  try {

    let catid = req.params.catid;

    let cat = await category.findOne({ _id: catid, isDeleted: false });

    if (!cat) {
      
      return res.status(400).send({ status: false, error: "Category Dosen't exist" });
    
    }

    await category.findOneAndUpdate(
     
      { _id: catid },
     
      { $set: { isDeleted: true, deletedAt: new Date().toISOString() } },
     
      { new: true }
    
      );
    
      return res.status(200).send({ status: true, message: "Category  Deleted Succesfully" });
  } catch (error) {
    
    return res.status(500).send({ status: false, error: 'Something Went Wrong' });
  
  }
};