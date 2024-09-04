const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    user_id: String,
    user_name: String,
    dept_name: String,
    phone: String,
    email: String,
    address: String,
    pincode: String,
    login_password: String,
    status: String,
    role_id:String,
    role: String,
    created_by_user:String,
    zone_name:String,
    ward_name:[String]
}, { timestamps: true });

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
