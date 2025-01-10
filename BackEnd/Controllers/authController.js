const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const userModel = require("../Models/userModel");
// const usersJson = require("../Services/usersJsonService");
// const generateToken = require("../JWT/jwt");

// router.post("/login", async (req, res) => {
//   try {
//     const { userName, password } = req.body;

//     if (!userName || !password) {
//       return res
//         .status(400)
//         .json({ error: "Username and password are required!" });
//     }

//     const user = await userModel.findOne({ userName });

//     if (!user) {
//       return res
//         .status(400)
//         .json({ error: "Invalid Details" });
//     }

//     const userJson = usersJson.getUserByIdFromJson(user.id.toString());
//     if (!userJson) {
//       return res.status(400).json({ error: "failed to find user details!" });
//     }

//     const token = await generateToken(user._id);

//     return res.status(200).json({
//       _id: user._id,
//       userName: user.userName,
//       token: token,
//       sessionTimeOut: userJson.sessionTimeOut,
//     });
//   } catch (error) {
//     console.error("Error in login Controller:", error.message);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// router.post("/register", async (req, res) => {
//   const { userName, password } = req.body;

//   try {
//     if (!userName || !password) {
//       return res
//         .status(400)
//         .json({ error: "Username and password are required!" });
//     }

//     let user = await userModel.findOne({ userName });

//     if (!user) {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       user = new userModel({
//         userName,
//         password: hashedPassword,
//       });
//       await user.save();

//       return res.status(201).json({
//         message: "User created successfully. Please log in.",
//         _id: user._id,
//         userName: user.userName,
//       });
//     }

//     if (user.password) {
//       return res
//         .status(400)
//         .json({ error: "User already has a password. Please log in." });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     user.password = hashedPassword;
//     await user.save();

//     return res.status(200).json({
//       message: "Password set successfully. Please log in.",
//       _id: user._id,
//       userName: user.userName,
//     });
//   } catch (error) {
//     console.error("Error in register Controller:", error.message);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// router.post("/logout", async (req, res) => {
//   try {
//     return res.status(200).json({ message: "Logged out successfully" });
//   } catch (error) {
//     console.error("Error in logout Controller:", error.message);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// module.exports = router;
