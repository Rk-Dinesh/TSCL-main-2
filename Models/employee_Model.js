const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const EmployeeSchema = new Schema({
    emp_id: String,
    emp_name: String,
    dept_name: String,
    phone: String,
    email: String,
    dob:String,
    address: String,
    pincode: String,
    designation_id:String,
    designation: String,
    status: String,
    created_by_user:String
}, { timestamps: true });

const EmployeeModel = mongoose.model('Employee', EmployeeSchema);
module.exports = EmployeeModel;
