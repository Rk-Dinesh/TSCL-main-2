const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const GrievanceWorksheetAttachmentSchema = new Schema({
    grievance_id: String,
    worksheet_id: String,
    attachment_name: String,
    created_by_user: String
}, { timestamps: true });

const GrievanceWorksheetAttachmentModel = db.model('GrievanceWorksheetAttachment', GrievanceWorksheetAttachmentSchema);
module.exports = GrievanceWorksheetAttachmentModel;
