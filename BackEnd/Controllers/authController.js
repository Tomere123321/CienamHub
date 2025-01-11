const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const userModel = require("../Models/userModel");
const generateToken = require("../JWT/jwt");

router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required!" });
    }

    const user = await userModel.findOne({ userName });

    if (!user) {
      return res.status(400).json({ error: "Invalid Details" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid UserName Or Password" });
    }

    const token = await generateToken(user._id);

    return res.status(200).json({
    message: "Logged in successfully",
      _id: user._id,
      userName: user.userName,
      token: token,
      sessionTimeOut: user.sessionTimeOut,
      
    });
  } catch (error) {
    console.error("Error in login Controller:", error.message);
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
