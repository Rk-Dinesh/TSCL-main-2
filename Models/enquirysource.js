const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;


const ResourceSchema = new Schema({
    res_id: {
        type: String
    },
    res_name: {
        type: String
    },
    status: {
        type: String
    },
    created_by_user: {
        type: String
    }
}, { timestamps: true });

const ResourceModel = mongoose.model('Resource',ResourceSchema);
module.exports = ResourceModel;
