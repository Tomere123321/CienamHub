const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true }
  });

    const memberModel = mongoose.model("member", memberSchema);

    module.exports = memberModel;