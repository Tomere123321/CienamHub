const memberModel = require("../Models/membersModel");

const getMembers = async () => {
    return await memberModel.find({});
}

const getMemberById = async (id) => {
    return await memberModel.findById(id);
}

const addMember = async (member) => {
    const newMember = new memberModel(member);
     await newMember.save();
     return 'Member added successfully';
}

const updateMember = async (id, member) => {
    await memberModel.findByIdAndUpdate(id, member);
    return 'Member updated successfully';
}

const deleteMember = async (id) => {
    await memberModel.findByIdAndDelete(id);
    return 'Member deleted successfully';
}

module.exports = { getMembers, getMemberById, addMember, updateMember, deleteMember };