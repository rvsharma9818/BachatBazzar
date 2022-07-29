const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { isValid, isValidRequestBody, isValidObjectId, isValidName, isValidEmail, isValidPhone, isValidPincode, isValidScripts, isValidPassword } = require("../validators/validate");
//============================================== User Creation ===============================================
const createUser = async function (req, res) {
  try {
    let data = req.body;
    // let data1 = JSON.parse(data.data)
    let file = req.file;
    console.log(file);
// ====================================== Destructuring the request Body =====================================

    let { fname, lname, phone, email, password} = data;

//============================================validations for inputs==========================================

    if (!isValidRequestBody(data)) {
      return res.status(400).send({ status: false, message: "Input Data for Creating User" });
    }

    if (!file || typeof file == "string" || file == "") {
      return res.status(400).send({ status: false, message: "Profile image is required..." });
    }

    if (!isValid(fname)) {
      return res.status(400).send({ status: false, message: "fname is required..." });
    }
    if (!isValidName(fname))
      return res.status(400).send({ status: false, msg: "Please Enter a valid First Name" });

    if (!isValid(lname)) {
      return res.status(400).send({ status: false, message: "lname is required..." });
    }
    if (!isValidName(lname))
      return res.status(400).send({ status: false, msg: "Please Enter a valid last Name" });

    if (!isValid(email)) {
      return res.status(400).send({ status: false, message: "Email is required" });
    }

    if (!phone) {
      return res.status(400).send({ status: false, message: "Phone No. is required" });
    }

    if (!isValid(password)) {
      return res.status(400).send({ status: false, message: "Password is required" });
    }
    if (!isValidPassword(password)) {
      return res.status(400).send({
        status: false,
        messsage:
          "password is invalid (Should Contain Alphabets, numbers, quotation marks  & [@ , . ; : ? & ! _ - $], and the length should be between 8 to 15",
      });
    }

    if (!data.address) {
      return res.status(400).send({ status: false, message: "address required" })
  }

  try{
    let address = JSON.parse(data.address)
  }
  catch(err){
    return res.status(400).send({ status: false, message: "Address should be valid object"  })
  }
  let address = JSON.parse(data.address)
    

  if (!address.shipping || !address.billing) {
      return res.status(400).send({ status: false, message: "shipping and billing address required" })

  }
  
  if (!address.shipping.street || !address.billing.street) {
      return res.status(400).send({ status: false, message: "street is  required " })

  }
  if (!address.shipping.city || !address.billing.city) {
      return res.status(400).send({ status: false, message: "city is  required" })

  }
  if (!address.shipping.pincode || !address.billing.pincode) {
      return res.status(400).send({ status: false, message: "pincode is  required " })

  }
  
  let shippingStreet = address.shipping.street
  let shippingCity = address.shipping.city
  let shippingPincode = parseInt(address.shipping.pincode)    
  if (shippingStreet) {
      let validateStreet = /^(?![0-9]*$)[A-Za-z0-9\s\-_,\.;:()]+$/
      if (!validateStreet.test(shippingStreet)) {
          return res.status(400).send({ status: false, message: "Should Contain Alphabets, numbers, quotation marks  & [@ , . ; : ? & ! _ - $]." })
      }
  }

  if (shippingCity) {
      let validateCity = /^(?![0-9]*$)[A-Za-z0-9\s\-_,\.;:()]+$/
      if (!validateCity.test(shippingCity)) {
          return res.status(400).send({ status: false, message: "Should Contain Alphabets, numbers, quotation marks  & [@ , . ; : ? & ! _ - $]." })
      }
  }
  if (shippingPincode) {
      let validatePincode = /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/     
      if (!validatePincode.test(shippingPincode)) {
          return res.status(400).send({ status: false, message: "Shipping address pincode must be 6 digit number" })
      }
  }


  let billingStreet = address.billing.street
  let billingCity = address.billing.city                             
  let billingPincode = parseInt(address.billing.pincode)
  if (billingStreet) {
      let validateStreet = /^(?![0-9]*$)[A-Za-z0-9\s\-_,\.;:()]+$/
      if (!validateStreet.test(billingStreet)) {
          return res.status(400).send({ status: false, message: "Should Contain Alphabets, numbers, quotation marks  & [@ , . ; : ? & ! _ - $]."})
      }
  }

  if (billingCity) {
      let validateCity = /^(?![0-9]*$)[A-Za-z0-9\s\-_,\.;:()]+$/
      if (!validateCity.test(billingCity)) {
          return res.status(400).send({ status: false, message: "Should Contain Alphabets, numbers, quotation marks  & [@ , . ; : ? & ! _ - $]." })
      }
  }
  if (billingPincode) {
      let validatePincode = /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/     
      if (!validatePincode.test(billingPincode)) {
          return res.status(400).send({ status: false, message: "Billing address pincode must be 6 digit number" })
      }
  }
  
  data.address = address


  //   if (!data1.address) {
  //     return res.status(400).send({ status: false, message: "address required" })
  // }
  // try{
  //     let address = JSON.parse(data1.address)
  //     if (!address || typeof address != "object") {
  //     return res.status(400).send({ status: false, message: "Object of address is required" });
  //   }
  // } catch(err){
  //   return res.status(400).send({ status: false, message: "Address should be valid object"  })
  // }
  // // let address = JSON.parse(data1.address)
  // // //     if (!address || typeof address != "object") {
  // // //     return res.status(400).send({ status: false, message: "Object of address is required" });
  // // //   }
  

  // if (!address.shipping || !address.billing) {
  //     return res.status(400).send({ status: false, message: "shipping and billing address required" })
  // }

  // let shippingStreet = address.shipping.street
  // let shippingCity = address.shipping.city
  // let shippingPincode = parseInt(address.shipping.pincode)     
  // if (shippingStreet) {
  //   if (!isValid(address.shipping.street)) {
  //       return res.status(400).send({
  //         status: false,
  //         message: "Street of shipping address is required...",
  //       });
  //     }
  //     if (!isValidScripts(address.shipping.street)) {
  //       return res.status(400).send({
  //         status: false,
  //         message:
  //           "street is invalid (Should Contain Alphabets, numbers, quotation marks  & [@ , . ; : ? & ! _ - $].",
  //       });
  //     }
  // }

  // if (shippingCity) {
  //   if (!isValid(address.shipping.city)) {
  //       return res.status(400).send({
  //         status: false,
  //         message: "City of shipping address is required...",
  //       });
  //     }
  // }
  // if (shippingPincode) {
  //   if (!isValidPincode(address.shipping.pincode)) {
  //       return res.status(400).send({
  //         status: false,
  //         message: "Shipping address pincode must be 6 digit number",
  //       });
  //     }
  // }


  // let billingStreet = address.billing.street
  // let billingCity = address.billing.city                       
  // let billingPincode = parseInt(address.billing.pincode)
  // if (billingStreet) {
  //   if (!isValid(address.billing.street)) {
  //     return res.status(400).send({
  //       status: false,
  //       message: "Street of billing address is required...",
  //     });
  //   }
  // }

  // if (billingCity) {
  //     if (!isValid(address.billing.city)) {
  //     return res.status(400).send({
  //       status: false,
  //       message: "City of billing address is required...",
  //     });
  //   }
  // }
  // if (billingPincode) {
  //   if (!isValidPincode(address.billing.pincode)) {
  //       return res.status(400).send({
  //         status: false,
  //         message: "Billing address pincode must be 6 digit number",
  //       });
  //     }
  // }
  
  // data1.address = address

    // if (!address || typeof address != "object") {
    //   return res.status(400).send({ status: false, message: "Object of address is required" });
    // }

    // if (!address.shipping || typeof address.shipping != "object") {
    //   return res.status(400).send({
    //     status: false,
    //     message: "Object shipping address is required...",
    //   });
    // }
    // if (!address.billing || typeof address.billing != "object") {
    //   return res.status(400).send({
    //     status: false,
    //     message: "Object billing address is required...",
    //   });
    // }

    // if (!isValid(address.shipping.street)) {
    //   return res.status(400).send({
    //     status: false,
    //     message: "Street of shipping address is required...",
    //   });
    // }
    // if (!isValidScripts(address.shipping.street)) {
    //   return res.status(400).send({
    //     status: false,
    //     message:
    //       "street is invalid (Should Contain Alphabets, numbers, quotation marks  & [@ , . ; : ? & ! _ - $].",
    //   });
    // }

    // if (!isValid(address.shipping.city)) {
    //   return res.status(400).send({
    //     status: false,
    //     message: "City of shipping address is required...",
    //   });
    // }

    // if (!isValidPincode(address.shipping.pincode)) {
    //   return res.status(400).send({
    //     status: false,
    //     message: "Shipping address pincode must be 6 digit number",
    //   });
    // }

    // if (!isValid(address.billing.street)) {
    //   return res.status(400).send({
    //     status: false,
    //     message: "Street of billing address is required...",
    //   });
    // }

    // if (!isValid(address.billing.city)) {
    //   return res.status(400).send({
    //     status: false,
    //     message: "City of billing address is required...",
    //   });
    // }

    // if (!isValidPincode(address.billing.pincode)) {
    //   return res.status(400).send({
    //     status: false,
    //     message: "Billing address pincode must be 6 digit number",
    //   });
    // }

//============================================= Validations for email and password ===============================
    
    if (phone == "")
      return res.status(400).send({ status: false, message: "Phone Number cannot be empty" });

    if (!isValidEmail(email)) {
      return res.status(400).send({ status: false, message: "Please enter a valid Email" });
    }

    const isRegisteredEmail = await userModel.findOne({ email });
    if (isRegisteredEmail) {
      return res.status(400).send({ status: false, message: "email id already registered" });
    }

    if (phone) {
      if (!isValidPhone(phone)) {
        return res.status(400).send({ status: false, message: "please enter a valid Phone no" });
      }
    }

    const isRegisteredphone = await userModel.findOne({ phone }).lean();

    if (isRegisteredphone) {
      return res.status(400).send({ status: false, message: "phoneNo number already registered" });
    }

    if (password == "" || password.toString().trim().length < 8) {
      return res.status(400).send({
        status: false,
        message: "Your password must be at least 8 characters",
      });
    }

    if (password.toString().trim().length > 15) {
      return res.status(400).send({
        status: false,
        message: "Password cannot be more than 15 characters",
      });
    }

    const bcryptPassword = await bcrypt.hash(password, 6);
    data.password = bcryptPassword;

    data.profileImage = req.file.location;

    const userCreated = await userModel.create(data);

    return res.status(201).send({ status: true, message: "Success", data: userCreated });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false, error: err.message });
  }
};

//====================================================Login=============================================

const loginUser = async (req, res) => {
  try {
    let requestBody = req.body;

    // structuring Body

    const { email, password } = requestBody;

    // Validation starts

    if (!isValidRequestBody(requestBody)) {
      return res.status(400).send({ status: false, msg: "Please enter login credentials" });
    }

    if (!isValid(email)) {
      res.status(400).send({ status: false, msg: "Enter an email" });
      return;
    }

    if (!isValidEmail(email)) {
      return res.status(400).send({
        status: false,
        message: `Email should be a valid email address`,
      });
    }

    if (!isValid(password)) {
      res.status(400).send({ status: false, msg: "enter a password" });
      return;
    }

    if (!(password.length >= 8 && password.length <= 15)) {
      return res.status(400).send({
        status: false,
        message: "Password should be Valid min 8 and max 15 ",
      });
    }

// ===============================================Encrypting the password && create Token=============================

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).send({
        status: false,
        message: `Invalid login credentials, email id doesn't exist`,
      });
    }

    let hashedPassword = user.password;

    const checkPassword = await bcrypt.compare(password, hashedPassword);

    if (!checkPassword)
      return res.status(401).send({
        status: false,
        message: `Invalid login credentials , Invalid password`,
      });

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        iat: Math.floor(Date.now() / 1000),
      },
      process.env.JWT_SEC,
      { expiresIn: Math.floor(Date.now() / 1000) + 168 * 60 * 60 }
    );

    res.status(200).send({
      status: true,
      messsge: "User Login Successful",
      data: { userId: user._id, token: token },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, error: error.message });
  }
};

//=========================================== Api for Get details by User id =========================================

let userProfile = async (req, res) => {
  try {
    const UserIdData = req.params.userId;

    if (!isValidObjectId(UserIdData))
      return res.status(400).send({ status: false, message: "userId is not valid" });

    let user = await userModel.findById(UserIdData);

    if (!user)
      return res.status(400).send({ status: false, messgage: " user does not exists" });

    return res.status(200).send({ status: true, message: "User pfofile details", data: user });
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

//===================================Update Api===================================================================

const updateUserDetails = async function (req, res) {
  try {
    const userId = req.params.userId;
    const formData = req.file;
    const updateData = req.body;

    //==validating userId==//
    if (!isValidObjectId(userId))
      return res.status(400).send({ status: false, msg: "invalid user Id" });
    let findUserId = await userModel.findById({ _id: userId });
    if (!findUserId)
      return res.status(404).send({ status: false, msg: "user not found" });

    //==validating request body==//
    if (!isValidRequestBody(updateData) && !formData)
      return res.status(400).send({ status: false, msg: "please provide data to update" });
    const { address, fname, lname, email, phone, password } = updateData;

    if (formData) {
      updateData.profileImage = req.file.location;
    }

    //==checking and validating fname==//
    if (fname == "") {
      return res.status(400).send({ status: false, message: "fname is not valid" });
    } else if (fname) {
      if (!isValid(fname))
        return res.status(400).send({ status: false, msg: "fname is missing" });
      if (!isValidName(fname))
        return res.status(400).send({ status: false, msg: "fname must contain only alphabates" });
    }

    //==checking and validating lname==//
    if (lname == "") {
      return res.status(400).send({ status: false, message: "lname is not valid" });
    } else if (lname) {
      if (!isValid(lname))
        return res.status(400).send({ status: false, msg: "lname is missing" });
      if (!isValidName(lname))
        return res.status(400).send({ status: false, msg: "lname must contain only alphabates" });
    }

    //==checking and validating email==//
    if (email == "") {
      return res.status(400).send({ status: false, message: "email is not valid" });
    } else if (email) {
      if (!isValidEmail(email))
        return res.status(400).send({ status: false, msg: "email is not valid" });
    }

    //==checking and validating phone==//
    if (phone == "") {
      return res.status(400).send({ status: false, message: "phone is not valid" });
    } else if (phone) {
      if (!isValidPhone(phone))
        return res.status(400).send({ status: false, msg: "phone is not valid" });
      let phoneExists = await userModel.findOne({ phone });
      if (phoneExists)
        return res.status(400).send({ status: false, message: "Phone Number Already Exists..." });
    }

    //==checking and validating password==//
    if (password == "") {
      return res.status(400).send({ status: false, message: "password is not valid" });
    } else if (password) {
      if (!isValidPassword(password))
        return res.status(400).send({ status: false, msg: "password is not valid" });
      updateData.password = await bcrypt.hash(password, 10);
    }

    //==checking and validating address==//
    if (address) {
      if (
        typeof address !== "object" ||
        Array.isArray(address) ||
        Object.keys(address).length == 0
      )
        return res.status(400).send({
          status: false,
          message: "Address Should be in Valid Format",
        });

      const findAddress = await userModel.findOne({ _id: userId });

      //==checking and validating shipping address- street,city,pincode==//
      if (address.shipping) {
        const { street, city, pincode } = address.shipping;
        if (street) {
          if (!isValid(street))
            return res.status(400).send({ status: false, msg: "shipping street is not valid " });
          findAddress.address.shipping.street = street;
        }
        if (city) {
          if (!isValid(city))
            return res.status(400).send({ status: false, msg: "shipping city is not valid " });
          findAddress.address.shipping.city = city;
        }
        if (pincode) {
          if (!isValidPincode(pincode))
            return res.status(400).send({ status: false, msg: "shipping pincode is not valid " });
          findAddress.address.shipping.pincode = pincode;
        }
      }

      //==checking and validating billing address- street,city,pincode==//
      if (address.billing) {
        const { street, city, pincode } = address.billing;
        if (street) {
          if (!isValid(street))
            return res.status(400).send({ status: false, msg: "billing street is not valid " });
          findAddress.address.billing.street = street;
        }
        if (city) {
          if (!isValid(city))
            return res.status(400).send({ status: false, msg: "billing city is not valid " });
          findAddress.address.billing.city = city;
        }
        if (pincode) {
          if (!isValidPincode(pincode))
            return res.status(400).send({ status: false, msg: "billing pincode is not valid " });
          findAddress.address.billing.pincode = pincode;
        }
      }
      updateData.address = findAddress.address;
    }

    //==updating user details==//
    const updateDetails = await userModel.findByIdAndUpdate(
      { _id: userId },
      updateData,
      { new: true }
    );
    return res.status(200).send({
      status: true,
      message: "User profile updated successfully",
      data: updateDetails,
    });
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
};


//===========================================================================================================

module.exports = { loginUser, userProfile, createUser, updateUserDetails };

//===========================================================================================================