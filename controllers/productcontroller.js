const productModel = require("../models/productModel");

const categoryModel = require("../models/categoryModel")

const currencySymbol = require("currency-symbol-map");

//================================================Create Product API==============================================

const createProduct = async (req, res) => {
  try {
    const requestBody = req.body;
    let file = req.file;
    const {
      title,
      description,
      price,
      currencyId,
      currencyFormat,
      isFreeShipping,
      style,
      availableSizes,
      installments,
      category
    } = requestBody;


    if (title == "") {
      return res
        .status(400)
        .send({ status: false, message: "Title  cannot be empty" });
    } 
      const isTitleAlreadyUsed = await productModel.findOne({ title });

      if (isTitleAlreadyUsed) {
        return res
          .status(400)
          .send({ status: false, message: "Please provide unique title" });
      }
    

    //========================================== validations for description =======================================

    if (description == "") {
      return res
        .status(400)
        .send({ status: false, message: "Description cannot be empty" });
    } 
    //========================================== validations for Price ==============================================

        if (price <= 0) {
      return res
        .status(400)
        .send({ status: false, message: `Price cannot be Zero` });
    }

    //========================================== validations for currencyId =========================================

    if (currencyId) {
      if (!(currencyId == "INR")) {
        return res
          .status(400)
          .send({ status: false, message: "currencyId should be INR" });
      }
    }

    if (currencyFormat) {
      if (!(currencyFormat == "₹")) {
        return res
          .status(400)
          .send({ status: false, message: "currencyformat should be ₹" });
      }
    }

    //========================================== validations for installments ========================================

    
    if (!category) {
      return res.status(400).send({ status: false, error: "Plss Enter a Category" })
    }

    

    let cat = await categoryModel.findOne({ _id: category, isDeleted: false })

    if (!cat) {
      return res.status(400).send({ status: false, error: "Category Don't exist" })
    }

    //==================================== validations for file upload ===============================================

    if (!file || typeof file == "string" || file == "") {
      return res
        .status(400)
        .send({ status: false, message: "Product image is required..." });
    }
    
    let productImagex = req.file.location;

    //==========================================  structuring the data ================================================

    const newProductData = {
      title,
      description,
      price,
      currencyId,
      currencyFormat: currencySymbol(currencyId),
      availableSizes,
      isFreeShipping,
      category,
      style,
      installments,
      productImage: productImagex,
    };

    
    

    if (availableSizes) {
      let array = availableSizes.split(",").map((x) => x.trim());

      for (let i = 0; i < array.length; i++) {
        if (!["S", "XS", "M", "X", "L", "XXL", "XL"].includes(array[i])) {
          return res
            .status(400)
            .send({
              status: false,
              message: `Available Sizes must be among ${[
                "S",
                "XS",
                "M",
                "X",
                "L",
                "XXL",
                "XL",
              ]}`,
            });
        }
      }

      if (Array.isArray(array)) {
        newProductData["availableSizes"] = [...new Set(array)];
      }
    }

    //=============================================== creating new product data =================================

    const saveProductDetails = await productModel.create(newProductData);
    return res
      .status(201)
      .send({
        status: true,
        message: "Product Successfully Created",
        data: saveProductDetails,
      });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};

//========================================= Api for get Product by Filter ============================================

const getProduct = async function (req, res) {
  try {
  
    const getData = await productModel
      .find({isDeleted:false})
      .select({ __v: 0 })
      .populate('category');

    if (getData.length == 0) {
      return res
        .status(404)
        .send({ status: false, message: "Product doesn't exist" });
    }

    return res
      .status(200)
      .send({ status: true, message: "Success", data: getData });
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

//========================================= Api For getProductById ===================================================

const getProductById = async (req, res) => {
  try {
    let productId = req.params.productId;

    
    let findProducts = await productModel
      .findOne({ _id: productId, isDeleted: false })
      .lean()
      .populate("category");

    if (!findProducts) {
      return res
      .status(404)
      .send({ status: false, message: "Product doesn't exist" });
    }
    return res
    .status(200)
    .send({ status: true, message: "Success", data: findProducts });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

//================================================== update Product API==========================================

const updateProduct = async function (req, res) {
  try {
    let requestBody = req.body;
    let files = req.file;
    let productId = req.params.productId;
    

    const {
      title,
      description,
      price,
      currencyId,
      isFreeShipping,
      style,
      availableSizes,
      installments,
      category
    } = requestBody;

    //========================================== validations for ObjectId && input Body===========================

    
    const updatedProductDetails = {}; // considering a empty object

    //================================================== validaiton for Upload for file============================

    if (req.file) {
      let x = req.file.location;
      updatedProductDetails["productImage"] = x;
    }

    // =========================================================Finding the Product ================================

    const product = await productModel.findOne({
      _id: productId,
      isDeleted: false,
    });

    if (!product) {
      return res
        .status(404)
        .send({ status: false, message: `product doesn't exist` });
    }

    if (requestBody.isDeleted && requestBody.isDeleted != "false") {
      return res
        .status(400)
        .send({ status: false, data: "isDeleted must be false" });
    }


    //=============================================== Validations for title========================================

    
    if (title) {
      const isTitleAlreadyUsed = await productModel.findOne({ title });

      if (isTitleAlreadyUsed) {
        return res
          .status(400)
          .send({ status: false, message: "Title is already used." });
      }
      if (!updatedProductDetails.hasOwnProperty("title"))
        updatedProductDetails["title"] = title;
    }
        if (category) {
    
    
      let cat = await categoryModel.findOne({ _id: category, isDeleted: false })

      if (!cat) {
        return res.status(400).send({ status: false, error: "Category Don't exist" })
      }
      updatedProductDetails["category"] = category;

    }
    //=================================================validations for Description==================================
 if (description) {

      if (!updatedProductDetails.hasOwnProperty("description"))
        updatedProductDetails["description"] = description;
    }

    //========================================validation for Price==================================================


    if (price) {

      if (price <= 0) {
        return res
          .status(400)
          .send({ status: false, message: `Price should be a valid number` });
      }

      if (!updatedProductDetails.hasOwnProperty("price"))
        updatedProductDetails["price"] = price;
    }

    //===================================== validations for currencyId================================================


    if (currencyId) {
      if (!(currencyId == "INR")) {
        return res
          .status(400)
          .send({ status: false, message: "currencyId should be a INR" });
      }

      if (!updatedProductDetails.hasOwnProperty("currencyId"))
        updatedProductDetails["currencyId"] = currencyId;
    }

    //=========================================validations for Freeshipping===========================================

    if (isFreeShipping == "")
      return res
        .status(400)
        .send({
          status: false,
          message: "isFreeShipping field cannot be empty",
        });

    if (isFreeShipping) {
      if (!(isFreeShipping === "true" || isFreeShipping === "false")) {
        return res
          .status(400)
          .send({
            status: false,
            message: "isFreeShipping should be a boolean value",
          });
      }

      if (!updatedProductDetails.hasOwnProperty("isFreeShipping"))
        updatedProductDetails["isFreeShipping"] = isFreeShipping;
    }

    //===================================validations for style========================================================

 if (style) {

      if (!updatedProductDetails.hasOwnProperty("style"))
        updatedProductDetails["style"] = style;
    }

    //============================== validations for availableSizes===================================================

if (availableSizes) {
      let sizesArray = availableSizes.split(",").map((x) => x.trim());

      for (let i = 0; i < sizesArray.length; i++) {
        if (!["S", "XS", "M", "X", "L", "XXL", "XL"].includes(sizesArray[i])) {
          return res
            .status(400)
            .send({
              status: false,
              message: `availableSizes should be among ${[
                "S",
                "XS",
                "M",
                "X",
                "L",
                "XXL",
                "XL",
              ]}`,
            });
        } else if (product.availableSizes.indexOf(sizesArray[i]) != -1) {
          return res
            .status(400)
            .send({ status: false, messagsg: "Size is already present" });
        }
      }

      if (!updatedProductDetails.hasOwnProperty(updatedProductDetails, "$push"))
        updatedProductDetails["$push"] = {};
      updatedProductDetails["$push"]["availableSizes"] = [
        ...new Set(sizesArray),
      ]; //{ $set: sizesArray }
    }

    //============================ validations for installments =======================================================


    if (installments) {
      if (!updatedProductDetails.hasOwnProperty("installments"))
        updatedProductDetails["installments"] = installments;
    }

    //=============================== after all validations finally updating the data====================================

    const updatedProduct = await productModel.findOneAndUpdate(
      { _id: productId },
      updatedProductDetails,
      { new: true }
    );
    return res
      .status(200)
      .send({
        status: true,
        message: "Successfully updated product details.",
        data: updatedProduct,
      });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

//========================================Api for deleteProductById=================================================

const deleteProductById = async (req, res) => {
  try {
    let productId = req.params.productId;

    //========================================= validations for ObjectId=========================================


    //=====================================Checking the product's existance in the Db=============================

    let checkProduct = await productModel.findOne({
      _id: productId,
      isDeleted: false,
    });

    if (!checkProduct) {
      return res
        .status(404)
        .send({ status: false, message: "Product doesn't exist" });
    }

    //==============================after checking the deletion of the product ===================================

    await productModel.findOneAndUpdate(
      { _id: productId },
      { $set: { isDeleted: true, deletedAt: new Date() } },
      { new: true }
    );

    return res
      .status(200)
      .send({ status: true, message: "Product Deleted Succesfully" });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

//============================================================================================================

module.exports = {
  createProduct,
  updateProduct,
  getProduct,
  getProductById,
  deleteProductById,
};
