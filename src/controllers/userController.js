const userModel = require("../models/userModel");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const { isValid, isValidRequestBody, isValidObjectId, isValidName, isValidEmail, isValidPhone, isValidPincode, isValidScripts, isValidPassword } = require("../validators/validate");

//========================================== User Creation===============================================

const createUser = async function (req, res) {
  try {
    let data = req.body;

    if (!req.body.address) {
      return res.status(400).send({ status: false, message: "Please provide address..." })
    }
    
    let file = req.file;
    // ====================================== Destructuring the request Body =====================================

    let { fname, lname, phone, email, password ,address} = data;

    //==================================validations for inputs==========================================

    if (!isValidRequestBody(data)) {
      return res.status(400).send({ status: false, message: "Please provide data for creating user..." });
    }

    if (!file || typeof file == "string" || file == "") {
      return res.status(400).send({ status: false, message: "Profile image is required..." });
    }

    if (!isValid(fname)) {
      return res.status(400).send({ status: false, message: "Please provide first name..." });
    }

    if (!isValidName(fname))
      return res.status(400).send({ status: false, message: "Please Enter a valid First Name..." });

    if (!isValid(lname)) {
      return res.status(400).send({ status: false, message: "Please provide last name..." });
    }
    if (!address) {
      return res.status(400).send({ status: false, message: "Please provide address..." })
    }

    if (!isValidName(lname))
      return res.status(400).send({ status: false, message: "Please Enter a valid last Name..." });

    if (!isValid(email)) {
      return res.status(400).send({ status: false, message: "Please provide email..." });
    }

    if (!phone) {
      return res.status(400).send({ status: false, message: "Please provide phone no..." });
    }

    if (!isValid(password)) {
      return res.status(400).send({ status: false, message: "Please provide Password..." });
    }
    
    if (!isValidPassword(password)) {
      return res.status(400).send({ status: false, messsage: "password is invalid (Should Contain Alphabets, numbers, quotation marks  & [@ , . ; : ? & ! _ - $], and the length should be between 8 to 15"});
    }

    //============================================= Validations for email and password ===============================

    if (phone == "")
      return res.status(400).send({ status: false, message: "Phone Number cannot be empty..." });

    if (!isValidEmail(email)) {
      return res.status(400).send({ status: false, message: "Please enter a valid Email..." });
    }

    const isRegisteredEmail = await userModel.findOne({ email });
    if (isRegisteredEmail) {
      return res.status(400).send({ status: false, message: "email id already registered..." });
    }

    if (phone) {
      if (!isValidPhone(phone)) {
        return res.status(400).send({ status: false, message: "please enter a valid Phone no..." });
      }
    }

    const isRegisteredphone = await userModel.findOne({ phone }).lean();

    if (isRegisteredphone) {
      return res.status(400).send({ status: false, message: "phoneNo number already registered..." });
    }

    if (password == "" || password.toString().trim().length < 8) {
      return res.status(400).send({ status: false, message: "Your password must be at least 8 characters..." });
    }

    if (password.toString().trim().length > 15) {
      return res.status(400).send({ status: false, message: "Password cannot be more than 15 characters...", });
    }

    const bcryptPassword = await bcrypt.hash(password, 6);
    data.password = bcryptPassword;

    data.profileImage = req.file.location;


    const userCreated = await userModel.create(data);

    return res.status(201).send({ status: true, message: "Success", data: userCreated });
  } catch (error) {
   
    return res.status(500).send({ status: false, error: error.message });
  };
}

//====================================================Login API==================================================

const loginUser = async (req, res) => {
  try {
    let requestBody = req.body;

    // structuring Body

    const { email, password } = requestBody;

    // Validation starts

    if (!isValidRequestBody(requestBody)) {
      return res.status(400).send({ status: false, message: "Please enter login credentials..." });
    }

    if (!isValid(email)) {
      return res.status(400).send({ status: false, message: "Enter an email..." }); 
    }

    if (!isValidEmail(email)) {
      return res.status(400).send({ status: false, message: "Email should be a valid email address..." });
    }

    if (!isValid(password)) {
      return res.status(400).send({ status: false, message: "enter a password..." });
    }

    if (!(password.length >= 8 && password.length <= 15)) {
      return res.status(400).send({ status: false, message: "Password should be Valid min 8 and max 15..." });
    }

    // ===============================================Encrypting the password && create Token=============================

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ status: false, message: "Email doesn't exist" });
    }

    let hashedPassword = user.password;

    const checkPassword = await bcrypt.compare(password, hashedPassword);

    if (!checkPassword)
      return res.status(404).send({ status: false, message: "Invalid login credentials , Invalid password..." });

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        role:user.role,
        iat: Math.floor(Date.now() / 1000),
      },
      process.env.JWT_SEC,
      { expiresIn: Math.floor(Date.now() / 1000) + 168 * 60 * 60 }
    );

    res.status(200).send({ status: true, messsge: "User Logged in Successfully", data: { userId: user._id, token: token } });
  } 
  catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};

//=========================================== Api for Get details by User id =========================================

let userProfile = async (req, res) => {
  try {
    const UserIdData = req.params.userId;

    if (!isValidObjectId(UserIdData)) return res.status(400).send({ status: false, message: "userId is not valid..." });

    let user = await userModel.findById(UserIdData);
    
    if (!user)  return res.status(404).send({ status: false, messgage: "User does not exists..." });
  
    return res.status(200).send({ status: true, message: "User profile Details", data: user });
  } 
  catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

//===================================Update User Detail Api===================================================================

const updateUserDetails = async function (req, res) {
  try {

    const userId = req.params.userId;
    const file = req.file;

    //==validating userId==//
    if (!isValidObjectId(userId)) return res.status(400).send({ status: false, message: "Please provide userId..." });


    let findUserId = await userModel.findById({ _id: userId });

    if (!findUserId) return res.status(404).send({ status: false, message: "user doesn't exist" });

    //==validating request body==//
    if (!isValidRequestBody(req.body) && !file) return res.status(400).send({ status: false, message: "Please provide data for updation" });

    const { address, fname, lname, email, phone, password } = req.body;

    const newbody = {}

    if (req.file) {
      let file = req.file

      if (!file || typeof file == "undefined" || file == "") {
        return res.status(400).send({ status: false, message: "Profile image is required..." });
      }
        let x = req.file.location
      newbody["profileImage"] = x
    }

    //==checking and validating fname==//
    if (fname) {
      if (!isValid(fname)) return res.status(400).send({ status: false, message: "Please provide first name..." });

      if (!isValidName(fname))
        return res.status(400).send({ status: false, message: "first name must contain only alphabates..." });
    }
    newbody["fname"] = fname

    //==checking and validating lname==//

    if (lname) {
      if (!isValid(lname))
        return res.status(400).send({ status: false, message: "Please provide last name..." });

      if (!isValidName(lname))
        return res.status(400).send({ status: false, message: "last name must contain only alphabates..." });
    }

    newbody["lname"] = lname

    if (email) {
      if (!isValidEmail(email))
        return res.status(400).send({ status: false, message: "Please provide valid E-mail..." });
    }
    newbody["email"] = email

    //==checking and validating phone==//
    if (phone) {
      if (!isValidPhone(phone))
        return res.status(400).send({ status: false, message: "Please provide valid phone number..." });

      let phoneExists = await userModel.findOne({ phone });
      if (phoneExists)
        return res.status(400).send({ status: false, message: "Phone Number Already Exists..." });
    }
    newbody["phone"] = phone

    //==checking and validating password==//
    if (password) {
      if (!isValidPassword(password))
        return res.status(400).send({ status: false, message: "Password is not valid..." });
      newbody["password"] = await bcrypt.hash(password, 10);
    }

    //==checking and validating address==//
    if (address) {
      newbody["address"] = findAddress.address;
    }
    

    //==updating user details==//
    const updateDetails = await userModel.findByIdAndUpdate({ _id: userId }, newbody, { new: true });
    return res.status(200).send({ status: true, message: "User profile updated successfully", data: updateDetails });
  }
  catch (error) {

    return res.status(500).json({ status: false, error: error.message });

  }
};

//===========================================================================================================

module.exports = { loginUser, userProfile, createUser, updateUserDetails };

//===========================================================================================================