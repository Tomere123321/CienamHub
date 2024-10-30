const userModel = require("../Models/userModel");
const usersJsonService = require("../Services/usersJsonService");
const permissions = require("./permissionsJsonService");

const getAllUsers = async () => {
  return await userModel.find({});
};

const getUserById = async (id) => {
  return await userModel.findById(id);
};

const CreateUser = async (user) => {
  const newUser = new userModel(user);
  await newUser.save();

  await Promise.all([
    usersJsonService.addUserFromJson({
      id: newUser._id,
      firstName: "",
      lastName: "",
      createdDate: new Date().toLocaleDateString("he-IL"), 
      sessionTimeOut: "",
    }),
    permissions.addPermission({
      id: newUser._id,
      permissions: [
        "View Subscriptions",
        "view movies",
      ],
    }),
  ]);

  return "User Created";
};

const updateUser = async (id, newData) => {
  await userModel.findByIdAndUpdate(id, newData, { new: true });
  return "User Updated";
};

const deleteUser = async (id) => {
  await Promise.all([
    userModel.findByIdAndDelete(id),
    usersJsonService.deleteUserFromJson(id),
    permissions.deletePermission(id),
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
