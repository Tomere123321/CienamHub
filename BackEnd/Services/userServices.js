const userModel = require("../Models/userModel");
const {deleteUserFromJson,} = require("../Services/usersJsonService");
const {  deletePermission } = require("./permissionsJsonService");

const getAllUsers = async () => {
  return await userModel.find({});
};

const getUserById = async (id) => {
  return await userModel.findById(id);
};

const CreateUser = async (user) => {
  const newUser = new userModel(user);
   await newUser.save();
  return "User Created";
};

const updateUser = async (id, newData) => {
  await userModel.findByIdAndUpdate(id, newData, { new: true });
  return "User Updated";
};

const deleteUser = async (id) => {
  await Promise.all([
    userModel.findByIdAndDelete(id),
    deleteUserFromJson(id),
    deletePermission(id),
  ]);
  return "User Deleted";
};

module.exports = {
  getAllUsers,
  getUserById,
  CreateUser,
  updateUser,
  deleteUser,
};
