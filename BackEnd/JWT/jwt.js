const jwt = require("jsonwebtoken");
let secretKey = "secretKey";
const usersJsonService = require("../Services/usersJsonService");

const user = usersJsonService.getUserByIdFromJson(userId);
const expiresIn = `${user.sessionTimeOut}m`; 


const generateToken = (userId) => {
  return jwt.sign({ userId }, secretKey, { expiresIn });
};


module.exports = generateToken;