const bcrypt = require("bcrypt");
const userModel = require("../Models/userModel");

const getAllUsers = async () => {
  return await userModel.find({});
};

const getUserById = async (id) => {
  const userId = await userModel.findById(id);
  return userId;
};

const CreateUser = async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
  const newUser = new userModel(user);
  await newUser.save();

  return "User Created";
};

const updateUser = async (id, newData) => {
  await userModel.findByIdAndUpdate(id, newData, { new: true });
  return "User Updated";
};

const deleteUser = async (id) => {
  await userModel.findByIdAndDelete(id);
  return "User Deleted";
};

// const getUserByUserName = async (userName) => {
//   return await userModel.findOne({ userName });
// };

module.exports = {
  getAllUsers,
  getUserById,
  CreateUser,
  updateUser,
  deleteUser,
  // getUserByUserName,
};
