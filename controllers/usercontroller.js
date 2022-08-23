const userModel = require("../models/usermodel");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");


//========================================== User Creation===============================================

const createUser = async function (req, res) {
    try {
        let data = req.body;

        let file = req.file;
        // ====================================== Destructuring the request Body =====================================

        let { name, mobile, email, password, } = data;

        //==================================validations for inputs==========================================

        // if (!file || typeof file == "string" || file == "") {
        //     return res.status(400).send({ status: false, message: "Profile image is required..." });
        // }

        const isRegisteredEmail = await userModel.findOne({ email });

        if (isRegisteredEmail) {
            return res.status(400).send({ status: false, message: "email id already registered..." });
        }


        const isRegisteredphone = await userModel.findOne({ mobile }).lean();

        if (isRegisteredphone) {
            return res.status(400).send({ status: false, message: "phoneNo number already registered..." });
        }

        const bcryptPassword = await bcrypt.hash(password, 6);

        data.password = bcryptPassword;

        data.profile = req.file.location;


        const userCreated = await userModel.create(data);

        return res.status(201).send({ status: true, message: "Success", data: userCreated });
    } catch (error) {

        return res.status(500).send({ status: false, error: error });
    };
}

//====================================================Login API==================================================

const loginUser = async (req, res) => {
    try {
        let requestBody = req.body;

        // structuring Body

        const { email, password } = requestBody;

        // Validation starts

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
                role: user.role,
                iat: Math.floor(Date.now() / 1000),
            },

            process.env.JWT_SEC,

            { expiresIn: Math.floor(Date.now() / 1000) + 168 * 60 * 60 }

        );

        return res.status(200).send({ status: true, messsge: "User Logged in Successfully", data: { userId: user._id, token: token } });
    }
    catch (error) {
        res.status(500).send({ status: false, error: error.message });
    }
};

//=========================================== Api for Get details by User id =========================================

let userProfile = async (req, res) => {
    try {
        const UserIdData = req.params.userId;


        let user = await userModel.findById(UserIdData);

        if (!user) return res.status(404).send({ status: false, messgage: "User does not exists..." });

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


        let findUserId = await userModel.findById({ _id: userId });

        if (!findUserId) return res.status(404).send({ status: false, message: "user doesn't exist" });

        //==validating request body==//

        const { name, email, mobile, password } = req.body;

        const newbody = {}

        if (req.file) {
            let file = req.file

            if (!file || typeof file == "undefined" || file == "") {
                return res.status(400).send({ status: false, message: "Profile image is required..." });
            }
            let x = req.file.location
            newbody["profile"] = x
        }

        //==checking and validating fname==//
        if (name) {

            newbody["name"] = name
        }


        if (email) {
            let Exists = await userModel.findOne({ email });
            if (Exists)
                return res.status(400).send({ status: false, message: "Phone Number Already Exists..." });

            newbody["email"] = email
        }
        //==checking and validating phone==//
        if (mobile) {
            let phoneExists = await userModel.findOne({ mobile });
            if (phoneExists)
                return res.status(400).send({ status: false, message: "Phone Number Already Exists..." });
        }
        newbody["mobile"] = mobile

        //==checking and validating password==//
        if (password) {
            newbody["password"] = await bcrypt.hash(password, 10);
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
