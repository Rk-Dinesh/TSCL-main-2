const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const GrievanceLogSchema = new Schema({
    grievance_id: String,
    log_details: String,
    created_by_user: String
}, { timestamps: true });

const GrievanceLogModel = db.model('GrievanceLog', GrievanceLogSchema);
module.exports = GrievanceLogModel;
