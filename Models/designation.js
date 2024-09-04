const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const DesignationSchema = new Schema({
    desgination_id: String,
    org_name: String,
    dept_name: String,
    designation: String,
    status: String,
    created_by_user:String
}, { timestamps: true });

const DesignationModel = mongoose.model('designation', DesignationSchema);
module.exports = DesignationModel;
