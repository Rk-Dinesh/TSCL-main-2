const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoleSchema = new Schema({
    role_id: String,
    role_name: String,
    status: String,
    created_by_user: String,
}, { timestamps: true });

const RoleModel = db.model('Role', RoleSchema);
module.exports = RoleModel;
