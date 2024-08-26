const db = require('../Config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const NewGrievanceSchema = new Schema({
  grievance_id: String,
  grievance_mode: String,
  complaint_type_title: String,
  dept_name: String,
  zone_name: String,
  ward_name: String,
  street_name: String,
  pincode: String,
  complaint: String,
  complaint_details: String,
  public_user_id: String,
  public_user_name: String,
  phone:String,
  assign_user:String,
  assign_username:String,
  assign_userphone:String,
  status: String,
  escalation_level: String,
  statusflow: String,
  priority: String,
}, { timestamps: true });

const NewGrievanceModel = mongoose.model('NewGrievance', NewGrievanceSchema);
module.exports = NewGrievanceModel;
