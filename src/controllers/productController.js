const productModel = require("../models/productModel");

const categoryModel = require("../models/categoryModel")
const {
  isValid,
  isValidRequestBody,
  isValidObjectId,
  isValidNumber,
  isValidScripts,
  validString,
  validInstallment,
} = require("../validators/validate");
const currencySymbol = require("currency-symbol-map");

//================================================Create Product API==============================================

const createProduct = async (req, res) => {
  try {
    const requestBody = req.body;
    let file = req.file;

    //========================================== validations for inputs============================================

    if (!isValidRequestBody(requestBody)) {
      return res
        .status(400)
        .send({
          status: false,
          message: "Invalid params received in request body",
        });
    }

    if (requestBody.isDeleted && requestBody.isDeleted != "false") {
      return res
        .status(400)
        .send({
          status: false,
          message: "Product cannot be deleted while updation",
        });
    }

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

    //========================================== validations for title ============================================

    if (title == "") {
      return res
        .status(400)
        .send({ status: false, message: "Title  cannot be empty" });
    } else if (title) {
      if (!validString(title) || !isValidScripts(title))
        return res.status(400).send({
          status: false,
          message:
            "Title is invalid (Should Contain Alphabets, numbers, quotation marks  & [@ , . ; : ? & ! _ - $].",
        });
      const isTitleAlreadyUsed = await productModel.findOne({ title });

      if (isTitleAlreadyUsed) {
        return res
          .status(400)
          .send({ status: false, message: "Please provide unique title" });
      }
    }

    //========================================== validations for description =======================================

    if (description == "") {
      return res
        .status(400)
        .send({ status: false, message: "Description cannot be empty" });
    } else if (description) {
      if (!validString(description) || !isValidScripts(description))
        return res
          .status(400)
          .send({
            status: false,
            message: "Description is not in valid format",
          });
    }

    //========================================== validations for Price ==============================================

    if (!validString(price)) {
      return res
        .status(400)
        .send({
          status: false,
          message: "Please provide Price for Creation Of product",
        });
    }

    if (!!isNaN(Number(price))) {
      return res
        .status(400)
        .send({ status: false, message: `Price should be a valid number` });
    }
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

    if (installments) {
      if (!validInstallment(installments)) {
        return res.status(400).send({
            status: false,
            message:
              "installments can't be a decimal number & must be greater than equalto zero...",
          });
      }
    }

    if (!category) {
      return res.status(400).send({ status: false, error: "Plss Enter a Category" })
    }

    if (!isValidObjectId(category)) {
      return res.status(400).send({ status: false, error: "Plss Enter a vail id" })
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

    //============================================= validations for availableSizes=====================================

    if (!validString(availableSizes)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide Available Sizes" });
    }

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
    let { size, name, priceGreaterThan, priceLessThan, priceSort } = req.query;
    let data = req.query;

    if (data.isDeleted && data.isDeleted != "false") {
      return res
        .status(400)
        .send({ status: false, message: "isDeleted must be false" });
    }

    const value = [size, name, priceGreaterThan, priceLessThan, priceSort];
    const valueString = [
      "size",
      "name",
      "priceGreaterThan",
      "priceLessThan",
      "priceSort",
    ];

    for (let i = 0; i < value.length; i++) {
      let key = `${value[i]}`;
      if (key == "") {
        return res
          .status(400)
          .send({
            status: false,
            message: `${valueString[i]} can not be empty`,
          });
      }
    }

    const filter = {};

    const isValidSize = (Arr) => {
      let newArr = [];
      if (Arr.length === 0) {
        return false;
      }
      let brr = Arr[0].split(",");
      for (let i = 0; i < brr.length; i++) {
        if (
          !["S", "XS", "M", "X", "L", "XXL", "XL"].includes(
            brr[i].toUpperCase()
          )
        ) {
          return false;
        }
        newArr.push(brr[i].toUpperCase());
      }
      return newArr;
    };

    if (size) {
      size = [size].flat();

      if (size && !isValidSize(size)) {
        return res
          .status(400)
          .send({
            status: false,
            message:
              "Size Must be of these values ---> S, XS, M, X, L, XXL, XL",
          });
      }

      size = isValidSize(size);
      filter.availableSizes = { $in: size };
    }

    if (name) {
      name = name.toString().trim();

      if (!isValid(name)) {
        return res
          .status(400)
          .send({ status: false, message: "name must be a valid string" });
      }

      if (name.length < 2)
        return res
          .status(400)
          .send({ status: false, message: "name must be at least 2 letters" });
      filter.title = { $regex: name, $options: "i" };
    }

    if (priceGreaterThan) {
      priceGreaterThan = priceGreaterThan.toString().trim();

      if (!isValidNumber(priceGreaterThan)) {
        return res
          .status(400)
          .send({
            status: false,
            message: "priceGreaterThan must have valid Numbers",
          });
      }
      filter.price = { $gte: priceGreaterThan };
    }

    if (priceLessThan) {
      priceLessThan = priceLessThan.toString().trim();

      if (!isValidNumber(priceLessThan)) {
        return res
          .status(400)
          .send({
            status: false,
            message: "priceLessThan must have valid Numbers",
          });
      }
      filter.price = { $lte: priceLessThan };
    }

    if (priceGreaterThan && priceLessThan) {
      if (priceGreaterThan == priceLessThan) {
        return res
          .status(400)
          .send({
            status: false,
            message: "priceGreaterThan and priceLessThan can not be the equal ",
          });
      }

      filter.price = { $gte: priceGreaterThan, $lte: priceLessThan };
    }

    filter.isDeleted = false;

    if (priceSort) {
      priceSort = priceSort.toString().trim();
      if (!(priceSort == "-1" || priceSort == "1")) {
        return res
          .status(400)
          .send({
            status: false,
            message: `value of priceSort must be 1 or -1 `,
          });
      }
    } else {
      priceSort = 1;
    }

    const getData = await productModel
      .find(filter)
      .sort({ price: priceSort })
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

    //================================  Validations for ObjectId =================================================

    if (!isValidObjectId(productId)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide valid Product Id" });
    }

    //================================================= Finding Products =========================================

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
    if (!isValidRequestBody(requestBody) && !files) {
      return res.status(400).send({ status: false, message: "Input field cannot be empty" });
    }


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

    if (!isValidObjectId(productId)) {
      return res
        .status(400)
        .send({
          status: false,
          message: `${productId} is not a valid product id`,
        });
    }
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

    if (title == "")
      return res
        .status(400)
        .send({ status: false, message: "Title  cannot be empty" });

    if (title) {
      if (!isValid(title) || !isValidScripts(title))
        return res
          .status(400)
          .send({ status: false, message: "Title is in invalid format" });
      const isTitleAlreadyUsed = await productModel.findOne({ title });

      if (isTitleAlreadyUsed) {
        return res
          .status(400)
          .send({ status: false, message: "Title is already used." });
      }
      if (!updatedProductDetails.hasOwnProperty("title"))
        updatedProductDetails["title"] = title;
    }
    if (category == "")
      return res
        .status(400)
        .send({ status: false, message: "category  cannot be empty" });

        if (category) {
      if(!isValid(category) ){
        return res.status(400).send({ status: false, error: "Plss Enter a vaild id" })

      }
      if (!isValidObjectId(category)) {
        return res.status(400).send({ status: false, error: "Plss Enter a vaild id" })
      }

      let cat = await categoryModel.findOne({ _id: category, isDeleted: false })

      if (!cat) {
        return res.status(400).send({ status: false, error: "Category Don't exist" })
      }
      updatedProductDetails["category"] = category;

    }
    //=================================================validations for Description==================================

    if (description == "") {
      return res
        .status(400)
        .send({ status: false, message: "Description  cannot be empty" });
    } else if (description) {
      if (!isValid(description) || !isValidScripts(description))
        return res
          .status(400)
          .send({ status: false, message: "Description is in invalid format" });

      if (!updatedProductDetails.hasOwnProperty("description"))
        updatedProductDetails["description"] = description;
    }

    //========================================validation for Price==================================================

    if (price == "")
      return res
        .status(400)
        .send({ status: false, message: "Price field cannot be empty" });

    if (price) {
      if (!isValid(price) || !isValidNumber(price)) {
        return res
          .status(400)
          .send({ status: false, message: `Price should be a valid number` });
      }

      if (price <= 0) {
        return res
          .status(400)
          .send({ status: false, message: `Price should be a valid number` });
      }

      if (!updatedProductDetails.hasOwnProperty("price"))
        updatedProductDetails["price"] = price;
    }

    //===================================== validations for currencyId================================================

    if (currencyId == "")
      return res
        .status(400)
        .send({ status: false, message: "currencyId field cannot be empty" });

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

    if (style == "") {
      return res
        .status(400)
        .send({ status: false, message: "style cannot be empty" });
    } else if (style) {
      if (!isValid(style) || !isValidScripts(style))
        return res
          .status(400)
          .send({ status: false, message: "style is in invalid format" });

      if (!updatedProductDetails.hasOwnProperty("style"))
        updatedProductDetails["style"] = style;
    }

    //============================== validations for availableSizes===================================================

    if (availableSizes == "") {
      return res
        .status(400)
        .send({ status: false, message: "availableSizes cannot be empty" });
    } else if (availableSizes) {
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

    if (installments == "") {
      return res
        .status(400)
        .send({ status: false, message: "installments cannot be empty" });
    }

    if (installments) {
      if (!validInstallment(installments)) {
        return res
          .status(400)
          .send({
            status: false,
            message:
              "installments should be in numbers & can't be a decimal number & must be greater than or equal to zero ",
          });
      }
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

    if (!isValidObjectId(productId)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide valid Product Id" });
    }

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

