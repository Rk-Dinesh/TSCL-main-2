const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoleAccessLevelSchema = new Schema({
    role_id: String,
    feature_access: String,
    access_type: String,
    status: String,
    created_by_user: String
}, { timestamps: true });

const RoleAccessLevelModel = db.model('RoleAccessLevel', RoleAccessLevelSchema);
module.exports = RoleAccessLevelModel;
