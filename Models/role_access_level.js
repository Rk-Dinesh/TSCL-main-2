const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoleAccessLevelSchema = new Schema({
    role_id: String,
    role_name: String,
    accessLevels: [
      {
        feature: String,
        permissions: [String]
      }
    ],
    status: String,
    created_by_user: String
}, { timestamps: true });

const RoleAccessLevelModel = mongoose.model('RoleAccessLevel', RoleAccessLevelSchema);
module.exports = RoleAccessLevelModel;
