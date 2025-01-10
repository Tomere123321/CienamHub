const jwt = require("jsonwebtoken");
// const usersJsonService = require("../Services/usersJsonService");

const secretKey = "secretKey";

// const generateToken = (userId) => {
//   try {
//     const user = usersJsonService.getUserByIdFromJson(userId);
//     if (!user) {
//       throw new Error("User not found");
//     }

//     const expiresIn = `${user.sessionTimeOut || 40}m`; 

//     return jwt.sign({ userId }, secretKey, { expiresIn });
//   } catch (error) {
//     console.error("Error generating token:", error.message);
//     throw new Error("Failed to generate token");
//   }
// };

module.exports = generateToken;
