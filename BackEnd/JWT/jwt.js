const jwt = require("jsonwebtoken");
const userServices = require("../Services/userServices");

const secretKey = "secretKey";

const generateToken = async (userId) => {
  try {
    const user = await userServices.getUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }
    const sessionTimeOut = user.sessionTimeOut;

    if (sessionTimeOut) {
      const token = jwt.sign({ userId }, secretKey, {
        expiresIn: sessionTimeOut,
      });
      return token;
    }
  } catch (error) {
    console.error("Error in generateToken:", error.message);
    throw new Error("Error in generateToken");
  }
};

module.exports = generateToken;
