const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const AccessLevelSchema = new Schema({
    role_id: String,
    role_name: String,
    description: String,
    accessLevels: [
      {
        feature: String,
        accessType: String,
        permissions: [String]
      }
    ]
}, { timestamps: true });

const RoleAccessLevelModel = mongoose.model('AccessLevel', AccessLevelSchema);
module.exports = RoleAccessLevelModel;
