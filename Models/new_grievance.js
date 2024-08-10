const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const NewGrievanceSchema = new Schema({
    grievance_id: String,
    complaint_type_title: String,
    title: String,
    complaint_details: String,
    dept_name: String,
    zone_name: String,
    ward_name: String,
    street_name: String,
    public_user_id: String,
    public_user_name: String,
    grievance_mode: String,
    status: String,
    escalation_level: String,
}, { timestamps: true });

const NewGrievanceModel = db.model('NewGrievance', NewGrievanceSchema);
module.exports = NewGrievanceModel;
