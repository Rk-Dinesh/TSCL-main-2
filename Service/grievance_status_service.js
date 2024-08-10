const GrievanceStatusModel = require('../Models/grievance_status');

exports.createGrievanceStatus = async (grievanceStatusData) => {
    const grievanceStatus = new GrievanceStatusModel(grievanceStatusData);
    return await grievanceStatus.save();
};

exports.getAllGrievanceStatuses = async () => {
    return await GrievanceStatusModel.find();
};
