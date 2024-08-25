const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const StatusSchema = new Schema({
    status_id: String,
    status_name: String,
    created_by_user: String,
}, { timestamps: true });

const StatusModel = mongoose.model('statuspreferance', StatusSchema);
module.exports = StatusModel;
