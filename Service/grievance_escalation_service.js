const GrievanceEscalationModel = require('../Models/grievance_escalation');


exports.getAllGrievanceEscalations = async () => {
    return await GrievanceEscalationModel.find();
};
exports.getGrievanceEscalationById = async (grievance_id) => {
    return await GrievanceEscalationModel.findOne({ grievance_id });
};

