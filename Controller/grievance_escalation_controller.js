const GrievanceEscalationService = require('../Service/grievance_escalation_service');
const Grievance = require('../Models/new_grievance');
const Complaint =require('../Models/complaint');
const GrievanceEscalation = require('../Models/grievance_escalation');


exports.getAllGrievanceEscalations = async (req, res, next) => {
    try {
        const grievanceEscalations = await GrievanceEscalationService.getAllGrievanceEscalations();
        res.status(200).json({
            status: true,
            message: "Grievance escalations retrieved successfully",
            data: grievanceEscalations
        });
    } catch (error) {
        next(error);
    }
};
exports.getGrievanceEscalationById = async (req, res, next) => {
    try {
        const { grievance_id } = req.query;
        const grievanceEscalation = await GrievanceEscalationService.getGrievanceEscalationById(grievance_id);
        if (!grievanceEscalation) {
            return res.status(404).json({ status: false, message: "Grievance escalation not found" });
        }
        res.status(200).json({
            status: true,
            message: "Grievance escalation retrieved successfully",
            data: grievanceEscalation
        });
    } catch (error) {
        next(error);
    }
};


const checkEscalation = async () => {
    // Get all grievances except status === 'closed'
    const grievances = await Grievance.find({ status: { $ne: 'closed' } });
  
    // Loop through each grievance
    for (const grievance of grievances) {

      // Get the complaint type and escalation details
      const complaint = await Complaint.findOne({ complaint_type_title: grievance.complaint });
  
      // Check if complaint is found
      if (!complaint) {
        console.log(`Complaint not found for grievance ${grievance.grievance_id}`);
        continue;
      }
  
      const escalationLevel = complaint.escalation_type;
  
      // Check if escalation_l1 is done
      if (complaint.escalation_l1 && grievance.escalation_level !== 'escalated_l1' && grievance.escalation_level !== 'escalated_l2' && grievance.escalation_level !== 'escalated_l3') {
        const escalationTime = complaint.escalation_l1;
        let escalationDateTime;
        if (escalationLevel === 'day') {
          escalationDateTime = new Date(grievance.createdAt.getTime() + escalationTime * 24 * 60 * 60 * 1000);
        } else if (escalationLevel === 'month') {
          escalationDateTime = new Date(grievance.createdAt.getTime() + escalationTime * 30 * 24 * 60 * 60 * 1000);
        }else if (escalationLevel === 'minute') {
            escalationDateTime = new Date(grievance.createdAt.getTime() + escalationTime * 60 * 1000);
        } else {
          console.log(`Invalid escalation level ${escalationLevel} for grievance ${grievance.grievance_id}`);
          continue;
        }
  
        // Check if the grievance has exceeded the escalation time
        if (new Date() > escalationDateTime) {
          // Create a new escalation document
          const escalation = new GrievanceEscalation({
            grievance_id: grievance.grievance_id,
            escalation_details: `Escalation level 1 exceeded`,
            escalation_level: 'l1',
            escalation_department: complaint.dept_name,
            escalation_to: complaint.escalation_l1,
            escalated_user: grievance.assign_user,
            status: grievance.status,
          });
  
          // Save the escalation document
          await escalation.save();
  
          // Update the grievance status
          await Grievance.updateOne({ grievance_id: grievance.grievance_id }, { escalation_level: 'escalated_l1' });
        }
      }
      // Check if escalation_l2 is done
      else if (complaint.escalation_l2 && grievance.escalation_level === 'escalated_l1') {
        const escalationTime = complaint.escalation_l2;
        let escalationDateTime;
        if (escalationLevel === 'day') {
          escalationDateTime = new Date(grievance.updatedAt.getTime() + escalationTime * 24 * 60 * 60 * 1000);
        } else if (escalationLevel === 'month') {
          escalationDateTime = new Date(grievance.updatedAt.getTime() + escalationTime * 30 * 24 * 60 * 60 * 1000);
        } else {
          console.log(`Invalid escalation level ${escalationLevel} for grievance ${grievance.grievance_id}`);
          continue;
        }
  
        // Check if the grievance has exceeded the escalation time
        if (new Date() > escalationDateTime) {
          // Create a new escalation document
          const escalation = new GrievanceEscalation({
            grievance_id: grievance.grievance_id,
            escalation_details: `Escalation level 2 exceeded`,
            escalation_level: 'l2',
            escalation_department: complaint.dept_name,
            escalation_to: complaint.complaint_type_title,
            escalated_user: grievance.assign_user,
            status: grievance.status,
          });
  
          // Save the escalation document
          await escalation.save();
  
          // Update the grievance status
          await Grievance.updateOne({ grievance_id: grievance.grievance_id }, { escalation_level: 'escalated_l2' });
        }
      }
      // Check if escalation_l3 is done
      else if (complaint.escalation_l3 && grievance.escalation_level === 'escalated_l2') {
        const escalationTime = complaint.escalation_l3;
        let escalationDateTime;
        if (escalationLevel === 'day') {
          escalationDateTime = new Date(grievance.updatedAt.getTime() + escalationTime * 24 * 60 * 60 * 1000);
        } else if (escalationLevel === 'month') {
          escalationDateTime = new Date(grievance.updatedAt.getTime() + escalationTime * 30 * 24 * 60 * 60 * 1000);
        } else {
          console.log(`Invalid escalation level ${escalationLevel} for grievance ${grievance.grievance_id}`);
          break;
        }

        if (new Date() > escalationDateTime) {
            // Create a new escalation document
            const escalation = new GrievanceEscalation({
              grievance_id: grievance.grievance_id,
              escalation_details: `Escalation level 3 exceeded`,
              escalation_level: 'l3',
              escalation_department: complaint.dept_name,
              escalation_to: complaint.escalation_l3,
              escalated_user: grievance.assign_user,
              status: grievance.status,
            });
    
            // Save the escalation document
            await escalation.save();
    
            // Update the grievance status
            await Grievance.updateOne({ grievance_id: grievance.grievance_id }, { escalation_level: 'escalated_l3' });
          }
    }
}

}