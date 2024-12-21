const jwt = require("jsonwebtoken");
const usersJsonService = require("../Services/usersJsonService");

let secretKey = "secretKey";

const generateToken = async (userId) => {
  try {
    const user = await usersJsonService.getUserByIdFromJson(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const sessionTimeOutInMinutes = user.sessionTimeOut;

    return jwt.sign({ userId }, secretKey, { expiresIn: `${sessionTimeOutInMinutes}m` });
  } catch (error) {
    console.error("Error generating token:", error.message);
    throw new Error("Failed to generate token. Please try again.");
  }
};

module.exports = generateToken;
