const mongoose = require('mongoose');
const { Schema } = mongoose;

const AlohaaSchema = new Schema({
    organisation_id: String,
    call_type:String,
    caller_number: String,
    receiver_number: String,
    did_number: String,
    received_at: String,
    ended_at: String,
    call_id: String,
    call_status: String,
    call_duration: String,
    call_recording_url:String,
    agent_name: String,
}, { timestamps: true });

const AlohaaModel = mongoose.model('Alohaaa', AlohaaSchema);
module.exports = AlohaaModel;
