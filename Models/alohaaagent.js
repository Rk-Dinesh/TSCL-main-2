const mongoose = require('mongoose');
const { Schema } = mongoose;

const AlohaaAgentSchema = new Schema({
    caller_number: String,
    agent_name: String,
}, { timestamps: true });

const AlohaaAgentModel = mongoose.model('AlohaaAgent', AlohaaAgentSchema);
module.exports = AlohaaAgentModel;
