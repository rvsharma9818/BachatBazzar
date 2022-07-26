const jwt = require("jsonwebtoken");
const { isValidObjectId } = require("../validators/validate");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err)
        res.status(403).json({ status: false, message: "Token is not valid!" });
      req.user = user;
      next();
    });s
  } else {
    return res
      .status(401)
      .json({ status: false, message: "You are not authenticated!" });
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.userId === req.params.userId) {
      next();
    } else {
      res
        .status(403)
        .json({ status: false, message: "You are not alowed to do that!" });
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
};
