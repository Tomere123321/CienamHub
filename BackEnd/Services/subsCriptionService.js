const subscriptionModel = require("../Models/subscriptionModel");

const subscription = async () => {
    return await subscriptionModel.find({});
}

const getSubscriptionById = async (id) => {
    return await subscriptionModel.findById(id);
}

const addSubscription = async (member) => {
    const newMember = new subscriptionModel(member);
     await newMember.save();
     return 'Subscription added successfully';
}

const updateSubscription = async (id, member) => {
    await subscriptionModel.findByIdAndUpdate(id, member);
    return 'Subscription updated successfully';
}

const deleteSubscription = async (id) => {
    await subscriptionModel.findByIdAndDelete(id);
    return 'subscription deleted successfully';
}

module.exports = { subscription, getSubscriptionById, addSubscription, updateSubscription, deleteSubscription };