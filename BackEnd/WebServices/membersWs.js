const axios = require("axios");
const memberModel = require("../Models/membersModel");

const fetchMembersFromWs = async () => {
  try {
    const existingMembers = await memberModel.countDocuments();
    if (existingMembers > 0) {
      console.log("Members data already exists in the DB");
      return;
    }
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    const membersData = response.data.map((member) => ({
      name: member.name,
      email: member.email,
      city: member.address.city,
    }));

    await memberModel.insertMany(membersData);
  } catch (e) {
    console.error("Error fetching members data:", e.message);
  }
};

module.exports = { fetchMembersFromWs };
