const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const TemplateSchema = new Schema({
    temp_id: String,
    dept_name: String,
    complaint_type: String,
    temp_title:String,
    desc: String,
    created_by_user:String,
}, { timestamps: true });

const TemplateModel = mongoose.model('Template', TemplateSchema);
module.exports = TemplateModel;
