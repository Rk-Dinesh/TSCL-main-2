const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;


const OrganizationSchema = new Schema({
    org_id: {
        type: String
    },
    org_name: {
        type: String
    },
    status: {
        type: String
    },
    created_by_user: {
        type: String
    }
}, { timestamps: true });

const OrganizationModel = db.model('Organization',OrganizationSchema);
module.exports = OrganizationModel;
