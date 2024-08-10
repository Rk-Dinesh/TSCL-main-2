const GrievanceEscalationModel = require('../Models/grievance_escalation');

exports.createGrievanceEscalation = async (grievanceEscalationData) => {
    const grievanceEscalation = new GrievanceEscalationModel(grievanceEscalationData);
    return await grievanceEscalation.save();
};

exports.getAllGrievanceEscalations = async () => {
    return await GrievanceEscalationModel.find();
};
exports.getGrievanceEscalationById = async (grievance_id) => {
    return await GrievanceEscalationModel.findOne({ grievance_id });
};

