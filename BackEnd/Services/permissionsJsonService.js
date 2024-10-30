const permissionsRepo = require('./repositories/PermissionsRepo')
const jsonFile = require('jsonfile');

const getPermissions = async () => {
    return await permissionsRepo.getAllPermissions();
}

const getById = async (id) => {
    const permissions = await getPermissions();
    return permissions.find(permission => permission.id === id);
}

const addPermission = async (newPermission) => {
    const permissions = await getPermissions();
    permissions.push(newPermission);
    return await jsonFile.writeFile('./Data/permissions.json', permissions, { spaces: 2 });
}

const updatePermission = async (id, newData) => {
    const permissions = await getPermissions();
    const index = permissions.findIndex(permission => permission.id === id);
    
    if (index === -1) {
        throw new Error(`Permission with id ${id} not found`);
    }

    permissions[index] = { ...permissions[index], ...newData }; 
    await jsonFile.writeFile('./Data/permissions.json', permissions, { spaces: 2 });
    return permissions[index];
};

const deletePermission = async (id) => {
    const permissions = await getPermissions();
    const index = permissions.findIndex(permission => permission.id === id);
    permissions.splice(index, 1);
    return await jsonFile.writeFile('./Data/permissions.json', permissions, { spaces: 2 });
}

module.exports = { getPermissions, getById, addPermission, updatePermission, deletePermission };