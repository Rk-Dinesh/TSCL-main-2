const GrievanceEscalationModel = require("../Models/grievance_escalation");

// exports.getAllGrievanceEscalations = async () => {
//     return await GrievanceEscalationModel.find({ status: {  $nin: ['closed', 'Closed','CLOSE', 'CLOSED'] } });
// };

exports.getAllGrievanceEscalations = async (escalated_userid = null) => {
  try {
    const query = {
      status: { $nin: ["closed", "Closed", "CLOSE", "CLOSED"] },
    };

    if (escalated_userid) {
      query.escalated_userid = escalated_userid;
    }
    return await GrievanceEscalationModel.find(query);
  } catch (error) {
    throw new Error(`Error fetching grievance escalations: ${error.message}`);
  }
};
exports.getGrievanceEscalationById = async (grievance_id) => {
  return await GrievanceEscalationModel.findOne({
    grievance_id,
    status: { $nin: ["closed", "Closed", "CLOSE", "CLOSED"] },
  });
};

exports.getGrievanceEscalationByDepartmentAndTo = async (
  escalation_department,
  escalation_to
) => {
  return await GrievanceEscalationModel.find({
    escalation_department,
    escalation_to,
    status: { $nin: ["closed", "Closed", "CLOSE", "CLOSED"] },
  });
};
