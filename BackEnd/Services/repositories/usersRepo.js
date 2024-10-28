const jsonFile = require('jsonfile');

const getAllUsers = () => {
    return jsonFile.readFile('./Data/users.json');
}

module.exports = { getAllUsers };