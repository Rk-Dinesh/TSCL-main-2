const GrievanceLogModel = require('../Models/grievance_log');

exports.createGrievanceLog = async (grievanceLogData) => {
    const grievanceLog = new GrievanceLogModel(grievanceLogData);
    return await grievanceLog.save();
};

exports.getAllGrievanceLogs = async () => {
    return await GrievanceLogModel.find();
};
exports.getGrievanceLogById = async (grievance_id) => {
    return await GrievanceLogModel.findOne({ grievance_id });
};
