const db = require("../Config/db");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const NewGrievanceSchema = new Schema(
  {
    grievance_id: String,
    grievance_mode: String,
    complaint_type_title: String,
    dept_name: String,
    zone_name: String,
    ward_name: String,
    street_name: String,
    pincode: String,
    complaintaddress: String,
    complaint: String,
    complaint_details: String,
    public_user_id: String,
    public_user_name: String,
    phone: String,
    assign_user: String,
    assign_username: String,
    assign_userphone: String,
    assign_time:String,
    status: String,
    escalation_level: String,
    statusflow: String,
    priority: String,
    lat: String,
    lon: String,
    operator:String,
    operator_id:String,
    escaltiontime:String,
    escaltiontype:String,
    escalation_notify:String,
    escalation_notify_read:String,
    worksheet_JE:String,
    isHighlighted:String,
    isReopened:String,
  },
  { timestamps: true }
);

const NewGrievanceModel = mongoose.model("NewGrievance", NewGrievanceSchema);
module.exports = NewGrievanceModel;
