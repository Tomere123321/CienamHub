const jsonFile = require('jsonfile');

const getAllPermissions = () => {
    return jsonFile.readFile('./Data/permissions.json');
}

module.exports = { getAllPermissions };