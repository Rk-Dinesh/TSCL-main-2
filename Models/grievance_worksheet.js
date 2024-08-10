const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const GrievanceWorksheetSchema = new Schema({
    grievance_id: String,
    worksheet_name: String,
    created_by_user: String,
}, { timestamps: true });

const GrievanceWorksheetModel = db.model('GrievanceWorksheet', GrievanceWorksheetSchema);
module.exports = GrievanceWorksheetModel;
