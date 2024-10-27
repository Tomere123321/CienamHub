const jwt = require("jsonwebtoken");
let secretKey = "secretKey";

const generateToken = (userId) => {
  return jwt.sign({ userId }, secretKey, { expiresIn: "2h" });
};


module.exports = generateToken;