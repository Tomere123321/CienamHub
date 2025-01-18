const bcrypt = require("bcrypt");
const userModel = require("../Models/userModel");
const permissionService = require("./permissionsService");

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

  let permissions = ["View Movies", "View Subscriptions"];
  if (newUser.isAdmin) {
    permissions = [
      "Create Movies",
      "Update Movies",
      "Delete Movies",
      "Create Subscriptions",
      "Update Subscriptions",
      "Delete Subscriptions",
    ];
  }
  const permission = {
    userId: newUser._id,
    permissions: permissions,
  };

  await permissionService.CreatePermission(permission);

  return "User & Permissions Was Created";
};

const updateUser = async (id, newData) => {
  await userModel.findByIdAndUpdate(id, newData, { new: true });
  if (newData.permissions) {
    const permissionUpdate = {
      permissions: newData.permissions,
    };
    await permissionService.updatePermission(id, permissionUpdate);
  }
  return "User & Permissions Was Updated";
};

const deleteUser = async (id) => {
  await userModel.findByIdAndDelete(id);
  await permissionService.deletePermission(id);
  return "User & Permissions Was Deleted";
};

module.exports = {
  getAllUsers,
  getUserById,
  CreateUser,
  updateUser,
  deleteUser,
};
