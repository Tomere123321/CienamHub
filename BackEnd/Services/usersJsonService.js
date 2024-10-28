const usersRepository = require('./repositories/usersRepo');
const jsonFile = require('jsonfile');

const getUsersFromJson = async () => {
    return await usersRepository.getAllUsers();
}

const getUserByIdFromJson = async (id) => {
    const userId = await getUsersFromJson();
    return userId.find(user => user.id === id);
}

const addUserFromJson = async (newUser) => {
    const Users = await getUsersFromJson()
    Users.push(newUser)
    return await jsonFile.writeFile('./Data/users.json', Users);
}

const updateUserFromJson = async (id, newData) => {
    const users = await getUsersFromJson();
    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        throw new Error(`User with id ${id} not found`);
    }

    users[index] = { ...users[index], ...newData }; 
    await jsonFile.writeFile('./Data/users.json', users, { spaces: 2 });
    return users[index];
};

const deleteUserFromJson = async (id) => {
    const Users = await getUsersFromJson();
    const index = Users.findIndex(user => user.id === id);
    Users.splice(index, 1);
    return await jsonFile.writeFile('./Data/users.json', Users);
}

module.exports = { getUsersFromJson, getUserByIdFromJson, addUserFromJson, updateUserFromJson, deleteUserFromJson };