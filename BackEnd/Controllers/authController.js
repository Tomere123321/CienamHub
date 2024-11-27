const express = require("express");
const router = express.Router();
const userModel = require("../Models/userModel");
const generateToken = require("../JWT/jwt");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await userModel.findOne({ userName });

    if (!user) {
      return res.status(400).json({ error: "Invalid username Or Password!" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username Or Password!" });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      _id: user._id,
      userName: user.userName,
      token: token,
    });
  } catch (error) {
    console.error("Error in login Controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/register", async (req, res) => {
  const { userName, password } = req.body;

  try {
  const user = await userModel.findOne({ userName });

    if (!user) {
      return res
        .status(404)
        .json({ error: "User does not exist. Please contact the admin." });
    }

   
    if (user.password) {
      return res
        .status(400)
        .json({ error: "User already has a password. Please log in." });
    }

    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(password, salt);

    user.password = securePassword; 
    await user.save();

    return res.status(200).json({
      message: "Password set successfully. Please log in.",
      _id: user._id,
      userName: user.userName,
    });
  } catch (error) {
    console.error("Error in register Controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/logout", async (req, res) => {
  try {
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout Controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
