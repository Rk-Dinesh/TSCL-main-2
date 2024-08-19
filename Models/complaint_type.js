const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ComplaintTypeSchema = new Schema({
    compliant_type_id: String,
    complaint_type: String,
    created_by_user: String,
}, { timestamps: true });

const ComplaintTypeModel = mongoose.model('ComplaintType', ComplaintTypeSchema);
module.exports = ComplaintTypeModel;
