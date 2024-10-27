// const userModel = require('../Models/userModel');

// const getAllUsers = async () => {
//     const allUsers = await userModel.find({});
//     return allUsers;
// }

// const getUserById = async (id) => {
//     const userById = await userModel.findById(id);
//     return userById;
// }

// const addUser = async (newUser) => {
//     const newUser = await userModel.create(newUser);
//    await newUser.save();
//     return newUser;
// }

// const updateUser = async (id, newData) => {
//     const updateUser = await userModel.findByIdAndUpdate(id, newData);
//     return updateUser;
// }

// const deleteUser = async (id) => {
//     const deleteUser = await userModel.findByIdAndDelete(id);
//     return deleteUser;
// }

const userModel = require('../Models/userModel');

const getAllUsers = async () => {
    return await userModel.find({});
};

const getUserById = async (id) => {
    return await userModel.findById(id);
};

const CreateUser = async (user) => {
    const newUser = new userModel(user);
     await newUser.save();
     return 'User Created';
};

const updateUser = async (id, newData) => {
     await userModel.findByIdAndUpdate(id, newData, { new: true });
    return 'User Updated';
};

const deleteUser = async (id) => {
     await userModel.findByIdAndDelete(id);
    return 'User Deleted';
};

module.exports = { getAllUsers, getUserById, CreateUser, updateUser, deleteUser };
