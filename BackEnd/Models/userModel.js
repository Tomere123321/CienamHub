const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    password: { type: String, default: 'user' }
  });
  
 const userModel = mongoose.model('user', userSchema);
  
  module.exports = userModel;