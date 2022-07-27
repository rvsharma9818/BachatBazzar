const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const { isValidObjectId } = require("../validators/validate");

const verifyToken = function(req, res, next)  {
  const authHeader = req.headers.token || req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1] || authHeader.split(" ").pop();
    
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err)
        return res.status(403).json({ status: false, message: "Token is not valid!" });
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ status: false, message: "You are not authenticated!" });
  }
};

// const checkUser = async function(userId){
//     let checkId = await userModel.findById({_id: userId})
    
//     if(!checkId) return false
//     else return true
    
// }

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (!isValidObjectId(req.params.userId))
      return res.status(400).send({ status: false, message: "userId is not valid" });
    // if(checkUser(req.params.userId)) return res.status(404).send({status: false, message: "User Not Found..."})
    if (req.user.userId === req.params.userId) {
      next();
    } else {
      
      return res.status(403).json({ status: false, message: "You are not alowed to do that!" });
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAuthorization };