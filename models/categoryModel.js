const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    categoryImage: {
      type: String,
      required: true,
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

module.exports = mongoose.model("Category", categorySchema);