const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const PublicUserSchema = new Schema({
    public_user_id: String,
    public_user_name: String,
    phone: String,
    email: String,
    address: String,
    pincode: String,
    login_password: String,
    verification_status: String,
    user_status: String,
}, { timestamps: true });

const PublicUserModel = db.model('PublicUser', PublicUserSchema);
module.exports = PublicUserModel;
