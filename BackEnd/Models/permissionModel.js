const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    permissions: { type: [String], required: true },
    });

const permissionModel = mongoose.model("permission", permissionSchema);

module.exports = permissionModel;