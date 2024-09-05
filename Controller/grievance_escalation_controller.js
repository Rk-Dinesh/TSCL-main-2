const GrievanceEscalationService = require("../Service/grievance_escalation_service");
const Grievance = require("../Models/new_grievance");
const Complaint = require("../Models/complaint");
const GrievanceEscalation = require("../Models/grievance_escalation");
const encryptData = require("../encryptedData");

exports.checkEscalation = async () => {
  
  const grievances = await Grievance.find({ status: {  $nin: ['closed', 'Closed','CLOSE', 'CLOSED'] } });
  // console.log(grievances);
  
  // Loop through each grievance
  for (const grievance of grievances) {
    // Get the complaint type and escalation details
    const complaint = await Complaint.findOne({
      complaint_type_title: grievance.complaint,
    });

    // Check if complaint is found
    if (!complaint) {
      console.log(
        `Complaint not found for grievance ${grievance.grievance_id}`
      );

      continue;
    }

    const escalationLevel = complaint.escalation_type;

    // Check if escalation_l1 is done
    if (
      complaint.escalation_l1 &&
      grievance.escalation_level !== "escalated_l1" &&
      grievance.escalation_level !== "escalated_l2" &&
      grievance.escalation_level !== "escalated_l3"
    ) {
      const level1 = complaint.escalation_l1;
      const escalationTime = parseInt(level1);
    //   console.log("executed1");

      let escalationDateTime;
      if (escalationLevel === "day") {
        escalationDateTime = new Date(
          grievance.createdAt.getTime() + escalationTime * 24 * 60 * 60 * 1000
        );
      } else if (escalationLevel === "month") {
        escalationDateTime = new Date(
          grievance.createdAt.getTime() +
            escalationTime * 30 * 24 * 60 * 60 * 1000
        );
      } else if (escalationLevel === "minute") {
        escalationDateTime = new Date(
          grievance.createdAt.getTime() + escalationTime * 60 * 1000
        );
      } else {
        console.log(
          `Invalid escalation level ${escalationLevel} for grievance ${grievance.grievance_id}`
        );
        continue;
      }

      // Check if the grievance has exceeded the escalation time
      if (new Date() > escalationDateTime) {
        // Create a new escalation document
        const escalation = new GrievanceEscalation({
          grievance_id: grievance.grievance_id,
          escalation_details: `Escalation level 1 exceeded`,
          escalation_level: "escalated_l1",
          escalation_department: complaint.dept_name,
          escalation_complaint: complaint.complaint_type_title,
          escalation_to: complaint.role_l1,
          escalated_user: grievance.assign_username,
          escalated_userid: grievance.assign_user,
          escalated_due: escalationTime,
          escalation_raisedby: grievance.public_user_name,
          escalation_priority: complaint.priority,
          status: grievance.status,
        });

        // Save the escalation document
        await escalation.save();
        // console.log("escalted_l1");

        // Update the grievance status
        await Grievance.updateOne(
          { grievance_id: grievance.grievance_id },
          { escalation_level: "escalated_l1" }
        );
      }
    }
    // Check if escalation_l2 is done
    else if (
      complaint.escalation_l2 &&
      grievance.escalation_level === "escalated_l1"
    ) {
      const level1 = complaint.escalation_l1;
      const level2 = complaint.escalation_l2;
    //   console.log("add", level1 + level2);
    //   console.log("add", parseInt(level1) + parseInt(level2));
      const escalationTime = parseInt(level1) + parseInt(level2);
    //   console.log("executed2");

      let escalationDateTime;
      if (escalationLevel === "day") {
        escalationDateTime = new Date(
          grievance.updatedAt.getTime() + escalationTime * 24 * 60 * 60 * 1000
        );
      } else if (escalationLevel === "month") {
        escalationDateTime = new Date(
          grievance.updatedAt.getTime() +
            escalationTime * 30 * 24 * 60 * 60 * 1000
        );
      } else if (escalationLevel === "minute") {
        escalationDateTime = new Date(
          grievance.createdAt.getTime() + escalationTime * 60 * 1000
        );
      } else {
        console.log(
          `Invalid escalation level ${escalationLevel} for grievance ${grievance.grievance_id}`
        );
        continue;
      }

      // Check if the grievance has exceeded the escalation time
      if (new Date() > escalationDateTime) {
        await GrievanceEscalation.updateOne(
          { grievance_id: grievance.grievance_id },
          {
            escalation_details: `Escalation level 2 exceeded`,
            escalation_level: "escalated_l2",
            escalation_department: complaint.dept_name,
            escalation_complaint: complaint.complaint_type_title,
            escalation_to: complaint.role_l2,
            escalated_user: grievance.assign_username,
            escalated_userid: grievance.assign_user,
            escalated_due: escalationTime,
            escalation_raisedby: grievance.public_user_name,
            escalation_priority: complaint.priority,
            status: grievance.status,
          }
        );
        // console.log("escalted_l2");
        // Update the grievance status
        await Grievance.updateOne(
          { grievance_id: grievance.grievance_id },
          { escalation_level: "escalated_l2" }
        );
      }
    }
    // Check if escalation_l3 is done
    else if (
      complaint.escalation_l3 &&
      grievance.escalation_level === "escalated_l2"
    ) {
      const level1 = complaint.escalation_l1;
      const level2 = complaint.escalation_l2;
      const level3 = complaint.escalation_l3;

    //   console.log("add", level1 + level2 + level3);
    //   console.log(
    //     "add",
    //     parseInt(level1) + parseInt(level2) + parseInt(level3)
    //   );
      const escalationTime =
        parseInt(level1) + parseInt(level2) + parseInt(level3);
    //   console.log("executed3");
      let escalationDateTime;
      if (escalationLevel === "day") {
        escalationDateTime = new Date(
          grievance.updatedAt.getTime() + escalationTime * 24 * 60 * 60 * 1000
        );
      } else if (escalationLevel === "month") {
        escalationDateTime = new Date(
          grievance.updatedAt.getTime() +
            escalationTime * 30 * 24 * 60 * 60 * 1000
        );
      } else if (escalationLevel === "minute") {
        escalationDateTime = new Date(
          grievance.createdAt.getTime() + escalationTime * 60 * 1000
        );
      } else {
        console.log(
          `Invalid escalation level ${escalationLevel} for grievance ${grievance.grievance_id}`
        );
        break;
      }

      if (new Date() > escalationDateTime) {
        await GrievanceEscalation.updateOne(
          { grievance_id: grievance.grievance_id },
          {
            escalation_details: `Escalation level 3 exceeded`,
            escalation_level: "escalated_l3",
            escalation_department: complaint.dept_name,
            escalation_complaint: complaint.complaint_type_title,
            escalation_to: complaint.role_l3,
            escalated_user: grievance.assign_username,
            escalated_userid: grievance.assign_user,
            escalated_due: escalationTime,
            escalation_raisedby: grievance.public_user_name,
            escalation_priority: complaint.priority,
            status: grievance.status,
          }
        );

        // console.log("escalted_l3");

        // Update the grievance status
        await Grievance.updateOne(
          { grievance_id: grievance.grievance_id },
          { escalation_level: "escalated_l3" }
        );
      }
    }
  }
};

exports.getAllGrievanceEscalations = async (req, res, next) => {
  try {
    const grievanceEscalations =
      await GrievanceEscalationService.getAllGrievanceEscalations();
      const encryptedData = encryptData(grievanceEscalations)
    res.status(200).json({
      status: true,
      message: "Grievance escalations retrieved successfully",
      data: encryptedData,
    });
  } catch (error) {
    next(error);
  }
};
exports.getGrievanceEscalationById = async (req, res, next) => {
  try {
    const { grievance_id } = req.query;
    const grievanceEscalation =
      await GrievanceEscalationService.getGrievanceEscalationById(grievance_id);
    if (!grievanceEscalation) {
      return res
        .status(404)
        .json({ status: false, message: "Grievance escalation not found" });
    }
    const encryptedData = encryptData(grievanceEscalation)
    res.status(200).json({
      status: true,
      message: "Grievance escalation retrieved successfully",
      data: encryptedData,
    });
  } catch (error) {
    next(error);
  }
};

exports.getGrievanceEscalationRoleDept = async (req, res, next) => {
  try {
    const { escalation_department, escalation_to } = req.query;
    const grievanceEscalation =
      await GrievanceEscalationService.getGrievanceEscalationByDepartmentAndTo(
        escalation_department,
        escalation_to
      );
    if (!grievanceEscalation) {
      return res
        .status(404)
        .json({ status: false, message: "Grievance escalation not found" });
    }
    const encryptedData = encryptData(grievanceEscalation)
    res.status(200).json({
      status: true,
      message: "Grievance escalation on role and dept  retrieved successfully",
      data: encryptedData,
    });
  } catch (error) {
    next(error);
  }
};
