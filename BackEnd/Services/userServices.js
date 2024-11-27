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
  try {
    const newUser = new userModel(user); 
    await newUser.save();

    await Promise.all([
      usersJsonService.addUserFromJson({
        id: newUser._id,
        firstName:  "",
        lastName: "",
        createdDate: new Date().toLocaleDateString("he-IL"), 
        sessionTimeOut: 40,
      }),
      permissions.addPermission({
        id: newUser._id,
        permissions: [
          "View Subscriptions",
          "View Movies",
        ],
      }),
    ]);

    return "User Created Successfully";
  
  } catch (error) {
    console.error("Error creating user:", error.message);
    throw new Error("Failed to create user. Please try again.");
  }
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

const getUserByUserName = async (userName) => {
return await userModel.findOne({userName})
}

module.exports = {
  getAllUsers,
  getUserById,
  CreateUser,
  updateUser,
  deleteUser,
  getUserByUserName
};
