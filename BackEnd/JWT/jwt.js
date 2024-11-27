const jwt = require("jsonwebtoken");
let secretKey = "secretKey";
const usersJsonService = require("../Services/usersJsonService");

// const user = usersJsonService.getUserByIdFromJson();
// const expiresIn = `${user.sessionTimeOut}m : 60m`; 


const generateToken = (userId) => {
  return jwt.sign({ userId }, secretKey, { expiresIn: "60m" });
};


module.exports = generateToken;