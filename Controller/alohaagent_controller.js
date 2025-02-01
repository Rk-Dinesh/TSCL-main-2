const encryptData = require('../encryptedData');
const AlohaaAgentService = require('../Service/alohaagent_service')
exports.createAgent = async (req, res, next) => {
    try {
        const { agent_name,caller_number } = req.body;
        const Agent = await AlohaaAgentService.createAlohaa({ agent_name,caller_number});
        res.status(200).json({
            status: true,
            message: "Agent created successfully"
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllAgent = async (req, res, next) => {
    try {
        const Agent = await AlohaaAgentService.getAllAgent();
        const encryptedData = encryptData(Agent)
        res.status(200).json({
            status: true,
            message: "AllAgent retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteAgentById = async (req, res, next) => {
    try {
        const { caller_number } = req.query;
        const result = await AlohaaAgentService.deleteAgentById(caller_number);
        if (!result) {
            return res.status(404).json({ status: false, message: "Agent not found" });
        }
        res.status(200).json({
            status: true,
            message: "Agent deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};