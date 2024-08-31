const GrievanceEscalationModel = require('../Models/grievance_escalation');


exports.getAllGrievanceEscalations = async () => {
    return await GrievanceEscalationModel.find();
};
exports.getGrievanceEscalationById = async (grievance_id) => {
    return await GrievanceEscalationModel.findOne({ grievance_id });
};

exports.getGrievanceEscalationByDepartmentAndTo = async (escalation_department, escalation_to) => {
    return await GrievanceEscalationModel.find({ escalation_department, escalation_to });
  };



