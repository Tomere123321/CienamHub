const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  sessionTimeOut: { type: Number, required: true },
  isAdmin: { type: Boolean, required: true },
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
}, { timestamps: true, default: Date.now });  

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
