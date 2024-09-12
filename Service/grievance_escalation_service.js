const GrievanceEscalationModel = require('../Models/grievance_escalation');

exports.getAllGrievanceEscalations = async () => {
    return await GrievanceEscalationModel.find({ status: {  $nin: ['closed', 'Closed','CLOSE', 'CLOSED'] } });
};
exports.getGrievanceEscalationById = async (grievance_id) => {
    return await GrievanceEscalationModel.findOne({ grievance_id, status: {  $nin: ['closed', 'Closed','CLOSE', 'CLOSED'] } } );
};

exports.getGrievanceEscalationByDepartmentAndTo = async (escalation_department, escalation_to) => {
    return await GrievanceEscalationModel.find({ escalation_department, escalation_to, status: {  $nin: ['closed', 'Closed','CLOSE', 'CLOSED'] }  });
  };


