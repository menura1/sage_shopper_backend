const { JwtSecret } = require("../constants/commonConstants");
const jwt = require("jsonwebtoken");

/// middle ware to verify jwt token
const auth = async (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res.status(500).json("No auth token");
  }

  const token = req.headers["authorization"].split(" ")[1];

  jwt.verify(token, JwtSecret, (error, payload) => {
    if (error) {
      return res.status(500).json("Unauthorized token");
    }
    req.userIdFromToken = payload._id;
    next();
  });
};

module.exports = {
  Auth: auth,
};
