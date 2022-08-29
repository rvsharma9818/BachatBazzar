const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    shortdescription:{
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: ObjectId,
      ref: 'Category',
      required: true
    },

    price: {
      type: Number,
      required: true,
      trim: true
    },
    currencyId: {
      type: String,
      required: true,
      enum: ["INR"]
    },
    currencyFormat: {
      type: String,
      required: true,
      trim: true
    },
    isFreeShipping: {
      type: Boolean,
      default: false,
      trim: true
    },
    productImage: {
      type: String,
      required: true,
      trim: true
    },
    style: {
      type: String,
      trim: true
    },
    availableSizes: [{ type: String, enum: ["S", "XS", "M", "X", "L", "XXL", "XL"] }],
    installments: {
      type: Number,
      trim: true
    },
    deletedAt: {
      type: String,
      default: null,
      trim: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
  }, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);