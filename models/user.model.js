const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    phoneno: {
      type: Number,
      required: true,
      unique: true,
    },
    emailid: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    avatar_id: {
      type: String,
      required: true,
    },
    role: {
      type: Boolean,
      default:false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
