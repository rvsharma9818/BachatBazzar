const jwt = require("jsonwebtoken");



const verifyToken = function (req, res, next) {
  
  const authHeader = req.headers.token || req.headers["authorization"];
  
  if (authHeader) {
  
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
  
      if (err)
  
      return res.status(401).json({ status: false, message: "Token is not valid!" });

      req.user = user;
      
      next();
    });
  } else {
    
    return res.status(401).json({ status: false, message: "You are not authenticated!" });
  
  }

};


const verifyTokenAndAuthorization = async (req, res, next) => {


  verifyToken(req, res, () => {

    if (req.user.userId === req.params.userId || req.user.role) {

      next();

    } else {

      return res.status(403).json({ status: false, message: "You are not authorized!" });
    }
  
  });

};

const verifyTokenAndAdmin = (req, res, next) => {

  verifyToken(req, res, () => {

    if (req.user.role) {

      next();

    } else {
     return res.status(403).json("You are not alowed to do that!");
    }
  
  });

};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};