const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },

    lname: {
      type: String,
      required: true,
    },
    role: {
      type: Boolean,
      default: false
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    profileImage: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true
    },
  }, { timestamps: true });

module.exports = mongoose.model("user", userSchema);
