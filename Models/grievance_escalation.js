const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const GrievanceEscalationSchema = new Schema({
    grievance_id: String,
    escalation_details: String,
    escalation_level: String,
    escalation_department: String,
    escalation_to: String,
    escalation_complaint: String,
    escalated_user: String,
    escalated_userid: String,
    escalated_due: String,
    escalation_raisedby:String,
    escalation_priority:String,
    status: String,
}, { timestamps: true });

const GrievanceEscalationModel = mongoose.model('GrievanceEscalation', GrievanceEscalationSchema);
module.exports = GrievanceEscalationModel;
