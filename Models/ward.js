const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const WardSchema = new Schema({

    ward_id: {
        type: String
    },
    status: {
        type: String
    },
    zone_id: {
        type: String
    },
    zone_name: {
        type: String
    },
    ward_name:{
        type: String
    },
    created_by_user: {
        type: String
    }
}, { timestamps: true });

const WardModel = db.model('Ward', WardSchema);
module.exports = WardModel;
