const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const NewGrievanceAttachmentSchema = new Schema({
    grievance_id: String,
    attachment: String,
    attachment_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GridFSBucket',
      },
    created_by_user: String
}, { timestamps: true });

const NewGrievanceAttachmentModel = mongoose.model('NewGrievanceAttachment', NewGrievanceAttachmentSchema);
module.exports = NewGrievanceAttachmentModel;
