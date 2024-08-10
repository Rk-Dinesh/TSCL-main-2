const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const GrievanceStatusSchema = new Schema({
    status_name: String,
    created_by_user: String
}, { timestamps: true });

const GrievanceStatusModel = db.model('GrievanceStatus', GrievanceStatusSchema);
module.exports = GrievanceStatusModel;
