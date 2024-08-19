const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ComplaintSchema = new Schema({
    complaint_id: {
        type: String
    },
    complaint_type_title: {
        type: String
    },
    dept_name: {
        type: String
    },
    tat_type: {
        type: String
    },
    tat_duration: {
        type: String
    },
    priority: {
        type: String
    },
    escalation_type: {
        type: String
    },
    escalation_l1: {
        type: String
    },
    role_l1:{
        type:String
    },
    escalation_l2: {
        type: String
    },
    role_l2:{
        type:String
    },
    escalation_l3: {
        type: String
    },
    role_l3:{
        type:String
    },
    status: {
        type: String
    },
    created_by_user: {
        type: String
    }
}, { timestamps: true });

const ComplaintModel = mongoose.model('Complaint', ComplaintSchema);
module.exports = ComplaintModel;
