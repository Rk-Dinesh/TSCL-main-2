const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const GrievanceAssignmentSchema = new Schema({
    grievance_id: String,
    user_id: String,
    assigned_to: String,
    assigned_time: { type: Date, default: Date.now },
}, { timestamps: true });

const GrievanceAssignmentModel = db.model('GrievanceAssignment', GrievanceAssignmentSchema);
module.exports = GrievanceAssignmentModel;
