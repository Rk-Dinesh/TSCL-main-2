const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const NewGrievanceAttachmentSchema = new Schema({
    grievance_id: String,
    attachment_name: String,
    created_by_user: String
}, { timestamps: true });

const NewGrievanceAttachmentModel = db.model('NewGrievanceAttachment', NewGrievanceAttachmentSchema);
module.exports = NewGrievanceAttachmentModel;
