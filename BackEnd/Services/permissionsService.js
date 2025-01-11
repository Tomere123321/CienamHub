const permissionsModel = require('../Models/permissionModel');

const getAllPermissions = async () => {
    return await permissionsModel.find({});
};

const getPermissionById = async (id) => {
    const permissionId = await permissionsModel.findById(id);
    return permissionId;
}

const CreatePermission = async (permission) => {
    const newPermission = new permissionsModel(permission);
    await newPermission.save();
    return "Permission Created";
};

const updatePermission = async (id, newData) => {
    await permissionsModel.findByIdAndUpdate(id, newData);
    return "Permission Updated";
}

const deletePermission = async (userId) => {
    await permissionsModel.findOneAndDelete({userId});
    return "Permission Deleted";
}

module.exports = {
    getAllPermissions,
    getPermissionById,
    CreatePermission,
    updatePermission,
    deletePermission,
};