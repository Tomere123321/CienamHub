const usersRepository = require('./repositories/usersRepo');
const jsonFile = require('jsonfile');


const getUsersFromJson = async (userId) => {
    const allUsers = await usersRepository.getAllUsers();
    return allUsers.filter(user => user.id !== userId);
};

const getUserByIdFromJson = async (id) => {
    const allUsers = await usersRepository.getAllUsers();
    return allUsers.find(user => user.id === id);
};

const addUserFromJson = async (newUser) => {
    const Users = await usersRepository.getAllUsers();
    Users.push(newUser);
    return await jsonFile.writeFile('./Data/users.json', Users, { spaces: 2 });
};

const updateUserFromJson = async (id, newData) => {
    const users = await usersRepository.getAllUsers();
    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        throw new Error(`User with id ${id} not found`);
    }

    users[index] = { ...users[index], ...newData };
    await jsonFile.writeFile('./Data/users.json', users, { spaces: 2 });
    return users[index];
};

const deleteUserFromJson = async (id) => {
    const users = await usersRepository.getAllUsers();
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        users.splice(index, 1);
        await jsonFile.writeFile('./Data/users.json', users, { spaces: 2 });
    }
};

module.exports = { getUsersFromJson, getUserByIdFromJson, addUserFromJson, updateUserFromJson, deleteUserFromJson };
