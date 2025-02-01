const AlohaaAgentModel = require("../Models/alohaaagent");

exports.createAlohaa = async (AgentData) => {
    const Agent = new AlohaaAgentModel(AgentData);
    return await Agent.save();
};

exports.getAllAgent = async () => {
    return await AlohaaAgentModel.find();
};

exports.deleteAgentById = async (caller_number) => {
    return await AlohaaAgentModel.findOneAndDelete({ caller_number });
};