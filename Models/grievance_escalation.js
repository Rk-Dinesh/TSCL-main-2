const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const GrievanceEscalationSchema = new Schema({
    grievance_id: String,
    escalation_details: String,
    escalation_level: String,
    escalation_department: String,
    escalation_to: String,
    escalated_user: String,
    status: String,
}, { timestamps: true });

const GrievanceEscalationModel = db.model('GrievanceEscalation', GrievanceEscalationSchema);
module.exports = GrievanceEscalationModel;
