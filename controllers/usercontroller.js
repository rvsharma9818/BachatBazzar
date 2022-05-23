const User = require("../models/user.model");
const ErrorHandler = require("../utils/ErrorHandler");
const { CatchAsyncError } = require("../middleware/CatchAsyncError");
const crypto = require("crypto-js");
const cloudinary = require("../helper/cloudinary");
const jwt = require("jsonwebtoken");
require("dotenv").config({
  path: "./.env",
});

//Register User

exports.createUser = CatchAsyncError(async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (user) {
      res.status(401).json("Username already exist");
    }
    const emailid = await User.findOne({ emailid: req.body.emailid });
    if (emailid) {
      res.status(401).json("Email already exist");
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    const newuser = new User({
      name: req.body.name,
      phoneno: req.body.phoneno,
      emailid: req.body.emailid,
      password: crypto.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString(),
      avatar: result.url,
      avatar_id: result.public_id,
      role: req.body.role,
    });

    newuser.save();
    res.status(200).json(newuser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//Login user

exports.LoginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ emailid: req.body.emailid });
    if (!user) {
      res.status(401).json("Wrong Email id");
    }
    const hashedpassword = crypto.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const originalpassword = hashedpassword.toString(crypto.enc.Utf8);
    const inputpassword = req.body.password;
    if (originalpassword != inputpassword) {
      console.log("Invalid Password");
    }

    const accesToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accesToken });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

//Get User Details

exports.userDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

//Update Usrt Profile

exports.updateProfile = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);
    // Delete image from cloudinary
    console.log(user);
    await cloudinary.uploader.destroy(user.avatar_id);
    // Upload image to cloudinary
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    const data = {
      name: req.body.name || user.name,
      phoneno: req.body.phoneno || user.phoneno,
      emailid: req.body.emailid || user.emailid,
      password: req.body.password || user.password,
      avatar: result?.url || user.avatar,
      avatar_id: result?.public_id || user.avatar_id,
      role: req.body.role || user.role,
    };
    user = await User.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.status(200).json(user);

  } catch (error) {
    res.status(500).json(error);
  }
};

// Get All users ---Admin
exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
};

// Get Single User Details ---Admin
exports.getSingleUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User is not found with this id", 400));
  }

  res.status(200).json({
    success: true,
    user,
  });
};

// Change user Role --Admin
exports.updateUserRole = async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
};

// Delete User ---Admin
exports.deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  const imageId = user.avatar_id;

  await cloudinary.uploader.destroy(imageId);

  if (!user) {
    return next(new ErrorHandler("User is not found with this id", 400));
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
};
