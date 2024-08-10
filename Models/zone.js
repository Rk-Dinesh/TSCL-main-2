const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ZoneSchema = new Schema({
    zone_id: {
        type: String
    },
    zone_name: {
        type: String
    },
    status: {
        type: String
    },
    created_by_user: {
        type: String
    }
}, { timestamps: true });

const ZoneModel = db.model('Zone', ZoneSchema);
module.exports = ZoneModel;
