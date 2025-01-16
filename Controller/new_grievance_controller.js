const NewGrievanceService = require("../Service/new_grievance_service");
const IdcodeServices = require("../Service/idcode_Service");
const encryptData = require("../encryptedData");
const UserModel = require("../Models/user");
const GrievanceLogModel = require("../Models/grievance_log");
const NewGrievanceModel = require("../Models/new_grievance");
const ComplaintModel = require("../Models/complaint");
const GrievanceEscalationModel = require("../Models/grievance_escalation");
const WardModel = require("../Models/ward");

// exports.createNewGrievance = async (req, res, next) => {
//     try {
//         const { grievance_mode,complaint_type_title, dept_name, zone_name, ward_name, street_name,pincode,complaint,complaint_details, public_user_id, public_user_name,phone,assign_user,assign_username,assign_userphone, status, escalation_level,statusflow,priority} = req.body;
//         const grievance_id = await IdcodeServices.generateCode("NewGrievance");
//         const newGrievance = await NewGrievanceService.createNewGrievance({ grievance_id,grievance_mode, complaint_type_title, dept_name, zone_name, ward_name, street_name,pincode,complaint,complaint_details, public_user_id, public_user_name,phone,assign_user,assign_username,assign_userphone, status, escalation_level,statusflow,priority});

//         res.status(200).json({
//             status: true,
//             message: "New grievance created successfully",
//             data: newGrievance.grievance_id
//         });
//     } catch (error) {
//         next(error);
//     }
// };

exports.createNewGrievance = async (req, res, next) => {
  try {
    const {
      grievance_mode,
      complaint_type_title,
      dept_name,
      ward_name,
      street_name,
      pincode,
      complaintaddress,
      complaint,
      complaint_details,
      public_user_id,
      public_user_name,
      phone,
      escalation_level,
      lon,
      lat,
      operator,
      operator_id
    } = req.body;
    const grievance_id = await IdcodeServices.generateCode("NewGrievance");

    const complaint_tat = await ComplaintModel.findOne({complaint_type_title:complaint})
    const wardData = await WardModel.findOne({ward_name:ward_name})

    const user = await UserModel.findOne({
      dept_name,
      ward_name: { $in: [ward_name] },
    });

    const assignTime = user ? Date.now() : null;

    if (user) {
      var newGrievance = await NewGrievanceService.createNewGrievance({
        grievance_id,
        grievance_mode,
        complaint_type_title,
        dept_name,
        zone_name:wardData.zone_name,
        ward_name,
        street_name,
        pincode,
        complaintaddress,
        complaint,
        complaint_details,
        public_user_id,
        public_user_name,
        phone,
        assign_user: user.user_id,
        assign_username: user.user_name,
        assign_userphone: user.phone,
        assign_time:assignTime,
        status:'processing',
        escalation_level,
        statusflow:'processing',
        priority:complaint_tat.priority,
        lon,
        lat,
        operator,
        operator_id,
        escaltiontime:complaint_tat.tat_duration,
        escaltiontype:complaint_tat.escalation_type
      });
      const newLog = await GrievanceLogModel.create({
        grievance_id,
        log_details: `Work assigned automatically to ${user.user_name}`,
        created_by_user: public_user_name,
      });
    } else {
      var newGrievance = await NewGrievanceService.createNewGrievance({
        grievance_id,
        grievance_mode,
        complaint_type_title,
        dept_name,
        zone_name:wardData.zone_name,
        ward_name,
        street_name,
        pincode,
        complaintaddress,
        complaint,
        complaint_details,
        public_user_id,
        public_user_name,
        phone,
        assign_time:assignTime,
        status:'processing',
        escalation_level,
        statusflow:'processing',
        priority:complaint_tat.priority,
        lon,
        lat,
        operator,
        operator_id,
        escaltiontime:complaint_tat.tat_duration,
        escaltiontype:complaint_tat.escalation_type
      });
    }

    res.status(200).json({
      status: true,
      message: "New grievance created successfully",
      data: newGrievance.grievance_id,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllNewGrievances = async (req, res, next) => {
  try {
    const newGrievances = await NewGrievanceService.getAllNewGrievances();
    const encryptedData = encryptData(newGrievances);
    res.status(200).json({
      status: true,
      message: "New grievances retrieved successfully",
      data: encryptedData,
    });
  } catch (error) {
    next(error);
  }
};
exports.getNewGrievanceById = async (req, res, next) => {
  try {
    const { grievance_id } = req.query;
    const newGrievance = await NewGrievanceService.getNewGrievanceById(
      grievance_id
    );
    if (!newGrievance) {
      return res
        .status(404)
        .json({ status: false, message: "New grievance not found" });
    }
    const encryptedData = encryptData(newGrievance);
    res.status(200).json({
      status: true,
      message: "New grievance retrieved successfully",
      data: encryptedData,
    });
  } catch (error) {
    next(error);
  }
};

exports.getNewGrievanceByPhone = async (req, res, next) => {
  try {
    const { phone } = req.query;
    const newGrievance = await NewGrievanceService.getNewGrievanceByPhone(
      phone
    );
    if (!newGrievance) {
      return res
        .status(404)
        .json({ status: false, message: "New grievance not found" });
    }
    const encryptedData = encryptData(newGrievance);
    res.status(200).json({
      status: true,
      message: "New grievance retrieved successfully",
      data: encryptedData,
    });
  } catch (error) {
    next(error);
  }
};

exports.getGrievanceByUserId = async (req, res, next) => {
  try {
    const { public_user_id } = req.query;
    const newGrievance = await NewGrievanceService.getGrievanceByUserId(
      public_user_id
    );
    if (!newGrievance) {
      return res
        .status(404)
        .json({ status: false, message: " grievance not found" });
    }
    const encryptedData = encryptData(newGrievance);
    res.status(200).json({
      status: true,
      message: "New grievance retrieved successfully",
      data: encryptedData,
    });
  } catch (error) {
    next(error);
  }
};

exports.getGrievanceByUstatusClosedID = async (req, res, next) => {
  try {
    const { public_user_id } = req.query;
    const newGrievance = await NewGrievanceService.getGrievanceBystatusClosed(
      public_user_id
    );
    if (!newGrievance) {
      return res
        .status(404)
        .json({ status: false, message: " grievance not found" });
    }
    const encryptedData = encryptData(newGrievance);
    res.status(200).json({
      status: true,
      message: "Status Closed grievance retrieved successfully",
      data: encryptedData,
    });
  } catch (error) {
    next(error);
  }
};

exports.getGrievanceByDept = async (req, res, next) => {
  try {
    const { dept_name } = req.query;
    const newGrievance = await NewGrievanceService.getGrievanceByDept(
      dept_name
    );
    if (!newGrievance) {
      return res
        .status(404)
        .json({ status: false, message: " grievance not found" });
    }
    const encryptedData = encryptData(newGrievance);
    res.status(200).json({
      status: true,
      message: "Dept grievance retrieved successfully",
      data: encryptedData,
    });
  } catch (error) {
    next(error);
  }
};

exports.getGrievanceByOperator = async (req, res, next) => {
  try {
    const { operator,operator_id } = req.query;
    const filter = {};

    if (operator) filter.operator = operator;
    if (operator_id) filter.operator_id = operator_id;
    const newGrievance = await NewGrievanceService.getGrievanceByOperator(filter);
    if (!newGrievance) {
      return res
        .status(404)
        .json({ status: false, message: " grievance not found" });
    }
    const encryptedData = encryptData(newGrievance);
    res.status(200).json({
      status: true,
      message: "Operator grievance retrieved successfully",
      data: encryptedData,
    });
  } catch (error) {
    next(error);
  }
};

exports.getGrievanceByDeptnotClosed = async (req, res, next) => {
  try {
    const { dept_name } = req.query;
    const newGrievance = await NewGrievanceService.getGrievanceByDeptnotClosed(
      dept_name
    );
    if (!newGrievance) {
      return res
        .status(404)
        .json({ status: false, message: " grievance not found" });
    }
    const encryptedData = encryptData(newGrievance);
    res.status(200).json({
      status: true,
      message: "Dept grievance notclosed retrieved successfully",
      data: encryptedData,
    });
  } catch (error) {
    next(error);
  }
};

exports.getGrievanceByDeptClosed = async (req, res, next) => {
  try {
    const { dept_name } = req.query;
    const newGrievance = await NewGrievanceService.getGrievanceByDeptClosed(
      dept_name
    );
    if (!newGrievance) {
      return res
        .status(404)
        .json({ status: false, message: " grievance not found" });
    }
    const encryptedData = encryptData(newGrievance);
    res.status(200).json({
      status: true,
      message: "Dept grievance closed retrieved successfully",
      data: encryptedData,
    });
  } catch (error) {
    next(error);
  }
};

exports.getGrievanceByAssign = async (req, res, next) => {
  try {
    const { assign_user } = req.query;
    const newGrievance = await NewGrievanceService.getGrievanceByAssign(
      assign_user
    );
    if (!newGrievance) {
      return res
        .status(404)
        .json({ status: false, message: " grievance not found" });
    }
    const encryptedData = encryptData(newGrievance);
    res.status(200).json({
      status: true,
      message: "New grievance retrieved successfully",
      data: encryptedData,
    });
  } catch (error) {
    next(error);
  }
};

exports.getGrievanceByAssignnotClosed = async (req, res, next) => {
  try {
    const { assign_user } = req.query;
    const newGrievance =
      await NewGrievanceService.getGrievanceByAssignnotClosed(assign_user);
    if (!newGrievance) {
      return res
        .status(404)
        .json({ status: false, message: " grievance not found" });
    }
    const encryptedData = encryptData(newGrievance);
    res.status(200).json({
      status: true,
      message: "New grievance not closed  retrieved successfully",
      data: encryptedData,
    });
  } catch (error) {
    next(error);
  }
};

exports.getGrievanceByAssignClosed = async (req, res, next) => {
  try {
    const { assign_user } = req.query;
    const newGrievance = await NewGrievanceService.getGrievanceByAssignClosed(
      assign_user
    );
    if (!newGrievance) {
      return res
        .status(404)
        .json({ status: false, message: " grievance not found" });
    }
    const encryptedData = encryptData(newGrievance);
    res.status(200).json({
      status: true,
      message: "New grievance closed retrieved successfully",
      data: encryptedData,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateEscalationNotify = async (req, res, next) => {
  try {
    const { grievance_id } = req.query;
    const { escalation_notify,escalation_notify_read } = req.body;

    const newGrievance = await NewGrievanceService.getNewGrievanceById(
      grievance_id
    );
    if (!newGrievance) {
      return res
        .status(404)
        .json({ status: false, message: "Grievance not found" });
    }

    newGrievance.escalation_notify = escalation_notify;
    newGrievance.escalation_notify_read = escalation_notify_read;
    
    await newGrievance.save();
    return res
      .status(200)
      .json({
        status: true,
        message: "escalation_notify updated successfully",
      });
  } catch (error) {
    next(error);
  }
};
exports.updateEscalationNotifyRead = async (req, res, next) => {
  try {
    const { grievance_id } = req.query;
    const { escalation_notify_read } = req.body;

    const newGrievance = await NewGrievanceService.getNewGrievanceById(
      grievance_id
    );
    if (!newGrievance) {
      return res
        .status(404)
        .json({ status: false, message: "Grievance not found" });
    }

    newGrievance.escalation_notify_read = escalation_notify_read;
    
    await newGrievance.save();
    return res
      .status(200)
      .json({
        status: true,
        message: "escalation_notify updated successfully",
      });
  } catch (error) {
    next(error);
  }
};

exports.updateworksheetJE = async (req, res, next) => {
  try {
    const { grievance_id } = req.query;
    const { worksheet_JE } = req.body;

    const newGrievance = await NewGrievanceService.getNewGrievanceById(
      grievance_id
    );
    if (!newGrievance) {
      return res
        .status(404)
        .json({ status: false, message: "Grievance not found" });
    }

    newGrievance.worksheet_JE = worksheet_JE;
    newGrievance.isEsacalted ='no';
    newGrievance.ticketclosedtime = new Date();
    
    await newGrievance.save();
    return res
      .status(200)
      .json({
        status: true,
        message: "worksheet_JE updated successfully",
      });
  } catch (error) {
    next(error);
  }
};

exports.ReopenTicket = async (req, res, next) => {
  try {
    const { grievance_id } = req.query;
    

    const newGrievance = await NewGrievanceService.getNewGrievanceById(
      grievance_id
    );
    if (!newGrievance) {
      return res
        .status(404)
        .json({ status: false, message: "Grievance not found" });
    }

    newGrievance.status = 'processing';
    newGrievance.isReopened = 'yes';
    
    await newGrievance.save();
    return res
      .status(200)
      .json({
        status: true,
        message: "Status updated successfully",
      });
  } catch (error) {
    next(error);
  }
};

exports.Highlighted = async (req, res, next) => {
  try {
    const { grievance_id } = req.query;
    const { isHighlighted } = req.body;

    const newGrievance = await NewGrievanceService.getNewGrievanceById(
      grievance_id
    );
    if (!newGrievance) {
      return res
        .status(404)
        .json({ status: false, message: "Grievance not found" });
    }

    newGrievance.isHighlighted = 'no';
    
    await newGrievance.save();
    return res
      .status(200)
      .json({
        status: true,
        message: "worksheet_JE updated successfully",
      });
  } catch (error) {
    next(error);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { grievance_id } = req.query;
    const { status } = req.body;

    const newGrievance = await NewGrievanceService.getNewGrievanceById(
      grievance_id
    );
    if (!newGrievance) {
      return res
        .status(404)
        .json({ status: false, message: "Grievance not found" });
    }

    newGrievance.status = status;
    newGrievance.statusflow = `${
      newGrievance.statusflow ? newGrievance.statusflow + "/" : ""
    }${status}`;

    await newGrievance.save();

    const escalation = await GrievanceEscalationModel.findOne({ grievance_id });
    if (escalation) {
      escalation.status = status;
      await escalation.save();
    }

    return res
      .status(200)
      .json({
        status: true,
        message: "Status and status flow updated successfully",
      });
  } catch (error) {
    next(error);
  }
};

exports.updateTransfer = async (req, res, next) => {
  try {
    const { grievance_id } = req.query;
    const { dept_name, complaint } = req.body;

    const newGrievance = await NewGrievanceService.getNewGrievanceById(
      grievance_id
    );
    if (!newGrievance) {
      return res
        .status(404)
        .json({ status: false, message: "Grievance not found" });
    }

    newGrievance.dept_name = dept_name;
    newGrievance.complaint = complaint;
    newGrievance.assign_username = "Yet to be assigned";
    newGrievance.assign_user = "Yet to be assigned";
    newGrievance.assign_userphone = "Yet to be assigned";
    await newGrievance.save();
    return res
      .status(200)
      .json({ status: true, message: "Transfered successfully" });
  } catch (error) {
    next(error);
  }
};

exports.updateAssign = async (req, res, next) => {
  try {
    const { grievance_id } = req.query;
    const { assign_user, assign_username, assign_userphone } = req.body;

    const newGrievance = await NewGrievanceService.getNewGrievanceById(
      grievance_id
    );
    if (!newGrievance) {
      return res
        .status(404)
        .json({ status: false, message: "Grievance not found" });
    }

    newGrievance.assign_user = assign_user;
    newGrievance.assign_username = assign_username;
    newGrievance.assign_userphone = assign_userphone;
    newGrievance.assign_time = Date.now();

    await newGrievance.save();

    return res
      .status(200)
      .json({ status: true, message: "Grievance Assigned successfully" });
  } catch (error) {
    next(error);
  }
};

exports.UpdateManyAssign = async (req, res, next) => {
  try {
    const { grievanceIds, assignUserDetails, user } = req.body;

    if (
      !grievanceIds ||
      !Array.isArray(grievanceIds) ||
      !assignUserDetails ||
      !user
    ) {
      return res.status(400).json({ error: "Invalid request" });
    }

    const grievances = await NewGrievanceModel.find({
      grievance_id: { $in: grievanceIds },
    });

    if (grievances.length === 0) {
      return res.status(404).json({ error: "No grievances found" });
    }

    const grievanceUpdates = grievanceIds.map((grievanceId) => ({
      updateOne: {
        filter: { grievance_id: grievanceId },
        update: {
          $set: {
            assign_user: assignUserDetails.assign_user,
            assign_username: assignUserDetails.assign_username,
            assign_userphone: assignUserDetails.assign_userphone,
            assign_time: Date.now(),
          },
        },
      },
    }));

    const grievanceLogs = grievances.map((grievance) => ({
      grievance_id: grievance.grievance_id,
      log_details: `Grievance assigned to JE: '${assignUserDetails.assign_username}' by  ${user}`,
      created_by_user: user,
    }));

    // Perform bulk operations
    await Promise.all([
      NewGrievanceModel.bulkWrite(grievanceUpdates),
      GrievanceLogModel.insertMany(grievanceLogs),
    ]);

    res.json({ message: "Grievances updated successfully with logs created" });
  } catch (error) {
    console.error("Error in UpdateManyAssign:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.UpdateManyTransfer = async (req, res, next) => {
  try {
    const { grievanceIds, transferDetails, user } = req.body;

    if (
      !grievanceIds ||
      !Array.isArray(grievanceIds) ||
      !transferDetails ||
      !user
    ) {
      return res.status(400).json({ error: "Invalid request" });
    }

    const grievances = await NewGrievanceModel.find({
      grievance_id: { $in: grievanceIds },
    });

    const grievanceUpdates = grievanceIds.map((grievanceId) => ({
      updateOne: {
        filter: { grievance_id: grievanceId },
        update: {
          $set: {
            dept_name: transferDetails.dept_name,
            complaint: transferDetails.complaint,
            assign_username: "Yet to be assigned",
            assign_user: "Yet to be assigned",
            assign_userphone: "Yet to be assigned",
          },
        },
      },
    }));

    const grievanceLogs = grievances.map((grievance) => ({
      grievance_id: grievance.grievance_id,
      log_details: `Grievance transferred from dept: '${grievance.dept_name}', complaint: '${grievance.complaint}' to new dept: '${transferDetails.dept_name}', complaint: '${transferDetails.complaint}' by ${user}`,
      created_by_user: user,
    }));

    await Promise.all([
      NewGrievanceModel.bulkWrite(grievanceUpdates),
      GrievanceLogModel.insertMany(grievanceLogs),
    ]);

    res.json({ message: "Grievances transferred successfully with logs created" });
  } catch (error) {
    console.error("Error in UpdateManyTransfer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteNewGrievanceById = async (req, res, next) => {
  try {
    const { grievance_id } = req.query;
    const result = await NewGrievanceService.deleteNewGrievanceById(
      grievance_id
    );
    if (!result) {
      return res
        .status(404)
        .json({ status: false, message: "New grievance not found" });
    }
    res.status(200).json({
      status: true,
      message: "New grievance deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.filterGrievances = async (req, res, next) => {
  try {
    const { zone_name, ward_name, street_name, dept_name, complaint } =
      req.query;
    const filter = {};

    if (zone_name) filter.zone_name = zone_name;
    if (ward_name) filter.ward_name = ward_name;
    if (street_name) filter.street_name = street_name;
    if (dept_name) filter.dept_name = dept_name;
    if (complaint) filter.complaint = complaint;

    filter.status = { $nin: ["closed", "Closed", "CLOSE", "CLOSED"] };

    const grievances = await NewGrievanceService.filterGrievances(filter);
    const encryptedData = encryptData(grievances);
    res.status(200).json({
      status: true,
      message: "New grievance Filtered successfully",
      data: encryptedData,
    });
  } catch (error) {
    next(error);
  }
};

// List wards with grievance count in descending order
exports.wardGrievanceCounts = async (req, res, next) => {
  try {
    //console.log('Executing aggregation pipeline...');
    const wardGrievanceCounts = await NewGrievanceModel.aggregate([
      {
        $group: {
          _id: "$ward_name",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    // console.log('Aggregation pipeline executed successfully');
    // console.log('Ward grievance counts:', wardGrievanceCounts);

    res.json(wardGrievanceCounts);
  } catch (error) {
    console.error("Error getting ward grievance counts:", error);
    res.status(500).json({ message: "Error retrieving ward grievance counts" });
  }
};

// Get the most frequent complainants user by ward with name and count
exports.frequentComplainantsByuserinward = async (req, res, next) => {
  try {
    //console.log('Executing aggregation pipeline...');
    const frequentComplainantsByWard = await NewGrievanceModel.aggregate([
      {
        $group: {
          _id: {
            ward_name: "$ward_name",
            public_user_name: "$public_user_name",
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $group: {
          _id: "$_id.ward_name",
          frequentComplainants: {
            $push: { name: "$_id.public_user_name", count: "$count" },
          },
        },
      },
    ]);

    // console.log('Aggregation pipeline executed successfully');
    // console.log('Frequent complainants by ward:', frequentComplainantsByWard);

    res.json(frequentComplainantsByWard);
  } catch (error) {
    // console.error('Error getting frequent complainants by ward:', error);
    res
      .status(500)
      .json({ message: "Error retrieving frequent complainants by ward" });
  }
};

exports.frequentComplainantsByWardAll = async (req, res, next) => {
  try {
    //console.log('Executing aggregation pipeline...');
    const frequentComplainantsByWard = await NewGrievanceModel.aggregate([
      {
        $group: {
          _id: { ward_name: "$ward_name", complaint: "$complaint" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $group: {
          _id: "$_id.ward_name",
          frequentComplaints: {
            $push: { complaint: "$_id.complaint", count: "$count" },
          },
        },
      },
    ]);

    //   console.log('Aggregation pipeline executed successfully');
    //   console.log('Frequent complaints by ward:', frequentComplainantsByWard);

    res.json(frequentComplainantsByWard);
  } catch (error) {
    //   console.error('Error getting frequent complaints by ward:', error);
    res
      .status(500)
      .json({ message: "Error retrieving frequent complaints by ward" });
  }
};

exports.frequentComplainantsByWard = async (req, res, next) => {
  try {
    //console.log('Executing aggregation pipeline...');
    const frequentComplainantsByWard = await NewGrievanceModel.aggregate([
      {
        $group: {
          _id: {
            dept_name: "$dept_name",
            ward_name: "$ward_name",
            complaint: "$complaint",
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $group: {
          _id: "$_id.ward_name",
          maxComplaint: {
            $first: {
              dept_name: "$_id.dept_name",
              complaint: "$_id.complaint",
              count: "$count",
            },
          },
        },
      },
    ]);

    //   console.log('Aggregation pipeline executed successfully');
    //   console.log('Max complaint by ward:', frequentComplainantsByWard);

    res.json(frequentComplainantsByWard);
  } catch (error) {
    //   console.error('Error getting max complaint by ward:', error);
    res.status(500).json({ message: "Error retrieving max complaint by ward" });
  }
};

// Get the top grievances contributed by public name with count
exports.topGrievancesByPublicName = async (req, res, next) => {
  try {
    //console.log('Executing aggregation pipeline...');
    const topGrievancesByPublicName = await NewGrievanceModel.aggregate([
      {
        $group: {
          _id: "$public_user_name",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 10, // Adjust this limit as needed
      },
    ]);

    // console.log('Aggregation pipeline executed successfully');
    // console.log('Top grievances by public name:', topGrievancesByPublicName);

    res.json(topGrievancesByPublicName);
  } catch (error) {
    // console.error('Error getting top grievances by public name:', error);
    res
      .status(500)
      .json({ message: "Error retrieving top grievances by public name" });
  }
};

exports.getGrievanceCounts = async (req, res, next) => {
  try {
    // console.log('Executing aggregation pipeline...');

    const counts = await NewGrievanceModel.aggregate([
      {
        $facet: {
          totalGrievances: [{ $count: "total" }],
          resolvedGrievances: [
            {
              $match: {
                status: { $in: ["closed", "Closed", "CLOSED", "CLOSE"] },
              },
            },
            { $count: "resolved" },
          ],
          pendingGrievances: [
            {
              $match: {
                status: {
                  $not: { $in: ["closed", "Closed", "CLOSED", "CLOSE"] },
                },
              },
            },
            { $count: "pending" },
          ],
          escalatedGrievances: [
            { $match: { escalation_level: { $exists: true } } },
            { $count: "escalated" },
          ],
          highPriorityGrievances: [
            { $match: { priority: "High" } },
            { $count: "highPriority" },
          ],
          reopendGrievances: [
            { $match: { status: "re-opened" } },
            { $count: "reopen" },
          ],
        },
      },
    ]);

    //   console.log('Aggregation pipeline executed successfully');
    //   console.log('Grievance counts:', counts);

    res.json(counts[0]);
  } catch (error) {
    //   console.error('Error getting grievance counts:', error);
    res.status(500).json({ message: "Error retrieving grievance counts" });
  }
};

exports.PriorityCounts = async (req, res, next) => {
  try {
    const priorityCounts = await NewGrievanceModel.aggregate([
      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 },
        },
      },
    ]);

    const priorityArray = priorityCounts.map((priorityCount) => {
      return {
        priority: priorityCount._id,
        count: priorityCount.count,
      };
    });

    res.json(priorityArray);
  } catch (error) {
    res.status(500).json({ message: "Error fetching priority counts" });
  }
};

exports.TopGrievancesByLocation = async (req, res, next) => {
  try {
    const topGrievancesByLocation = await NewGrievanceModel.aggregate([
      {
        $group: {
          _id: "$zone_name",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    const locationCounts = topGrievancesByLocation.map((locationCount) => {
      return {
        zone: locationCount._id,
        count: locationCount.count,
      };
    });

    res.json(locationCounts);
  } catch (error) {
    //   console.error("Error fetching top grievances by location:", error);
    res
      .status(500)
      .json({ message: "Error fetching top grievances by location" });
  }
};

exports.TopGrievancescomplaint = async (req, res, next) => {
  try {
    const topGrievancesByComplaint = await NewGrievanceModel.aggregate([
      {
        $group: {
          _id: "$complaint",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    const complaintCounts = topGrievancesByComplaint.map((complaintCount) => {
      return {
        complaint: complaintCount._id,
        count: complaintCount.count,
      };
    });

    res.json(complaintCounts);
  } catch (error) {
    // console.error("Error fetching top grievances by complaint:", error);
    res
      .status(500)
      .json({ message: "Error fetching top grievances by complaint" });
  }
};

exports.EngineerWorkload = async (req, res, next) => {
  try {
    const engineerWorkload = await NewGrievanceModel.aggregate([
      {
        $group: {
          _id: {
            $ifNull: ["$assign_username", "Yet to be assigned"],
          },
          count: { $sum: 1 },
          closedCount: {
            $sum: {
              $cond: { if: { $eq: ["$status", "closed"] }, then: 1, else: 0 },
            },
          },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    const engineerCounts = engineerWorkload.map((engineerCount) => {
      return {
        engineer: engineerCount._id,
        count: engineerCount.count,
        closedCount: engineerCount.closedCount,
      };
    });

    res.json(engineerCounts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching engineer workload" });
  }
};

exports.AverageResolutionTimeByEngineerByDepartment = async (
  req,
  res,
  next
) => {
  try {
    const averageResolutionTimeByEngineerByDepartment =
      await NewGrievanceModel.aggregate([
        {
          $match: {
            status: { $in: ["closed", "Closed", "CLOSED", "CLOSE"] },
          },
        },
        {
          $group: {
            _id: {
              engineer: "$assign_username",
              department: "$dept_name",
            },
            averageResolutionTime: {
              $avg: {
                $divide: [
                  { $subtract: ["$updatedAt", "$createdAt"] },
                  86400000, // convert milliseconds to hours
                ],
              },
            },
          },
        },
        {
          $sort: {
            "_id.department": 1,
            "_id.engineer": 1,
          },
        },
      ]);

    const averageResolutionTimeByEngineerByDepartmentArray =
      averageResolutionTimeByEngineerByDepartment.map((doc) => {
        return {
          department: doc._id.department,
          engineer: doc._id.engineer,
          averageResolutionTime: doc.averageResolutionTime,
        };
      });

    res.json(averageResolutionTimeByEngineerByDepartmentArray);
  } catch (error) {
    res
      .status(500)
      .json({
        message:
          "Error fetching average resolution time by engineer by department",
      });
  }
};

exports.PercentageOfGrievancesResolvedWithinSpecifiedPeriodByDepartmentAndComplaintType =
  async (req, res, next) => {
    try {
      let totalGrievancesReceived = 0;
      let totalGrievancesResolvedWithinPeriod = 0;
      let totalGrievanceResolved = 0;

      const grievances = await NewGrievanceModel.find();

      const uniqueKeys = {};

      for (const grievance of grievances) {
        const complaintData = await ComplaintModel.findOne({
          complaint_type_title: grievance.complaint,
        });

        if (!complaintData) {
          console.log(
            "Complaint data not found for grievance id: " +
              grievance.grievance_id
          );
          continue;
        }

        const department = grievance.dept_name;
        const complaintType = grievance.complaint;
        const escalationType = complaintData.escalation_type;
        const escalationL1 = complaintData.escalation_l1;

        let periodInDays;
        if (escalationType === "day") {
          periodInDays = escalationL1;
        } else if (escalationType === "month") {
          periodInDays = escalationL1 * 30; // assume 30 days in a month
        } else if (escalationType === "minute") {
          periodInDays = escalationL1 / 1440; // convert minutes to days
        }

        const key = `${department}_${complaintType}`;

        if (!uniqueKeys[key]) {
          uniqueKeys[key] = true;

          const grievancesReceived = await NewGrievanceModel.countDocuments({
            dept_name: department,
            complaint: complaintType,
          });

          const grievancesResolvedWithinPeriod =
            await NewGrievanceModel.countDocuments({
              dept_name: department,
              complaint: complaintType,
              status: "closed",
              updatedAt: {
                $gte: new Date(Date.now() - periodInDays * 24 * 60 * 60 * 1000),
              },
            });

          const grievancesResolved = await NewGrievanceModel.countDocuments({
            dept_name: department,
            complaint: complaintType,
            status: "closed",
          });

          totalGrievancesReceived += grievancesReceived;
          totalGrievancesResolvedWithinPeriod += grievancesResolvedWithinPeriod;
          totalGrievanceResolved += grievancesResolved;

          // console.log({
          //   department,
          //   complaintType,
          //   grievancesReceived,
          //   grievancesResolvedWithinPeriod,
          //   grievancesResolved
          // });
        }
      }

      const totalPercentageResolved =
        (totalGrievancesResolvedWithinPeriod / totalGrievancesReceived) * 100;
      const generalPercentage =
        (totalGrievanceResolved / totalGrievancesReceived) * 100;

      res.json({
        totalPercentageResolved: totalPercentageResolved.toFixed(2),
        totalGrievancesReceived: totalGrievancesReceived,
        totalGrievancesResolvedWithinPeriod:
          totalGrievancesResolvedWithinPeriod,
        generalPercentage: generalPercentage.toFixed(2),
        generalResolved: totalGrievanceResolved,
      });
    } catch (error) {
      res
        .status(500)
        .json({
          message:
            "Error fetching percentage of grievances resolved within specified period",
        });
    }
  };

exports.PercentageOfGrievancesEscalatedToHigherAuthorities = async (
  req,
  res,
  next
) => {
  try {
    const totalGrievances = await NewGrievanceModel.countDocuments();
    let escalatedL1 = 0;
    let escalatedL2 = 0;
    let escalatedL3 = 0;

    const grievances = await NewGrievanceModel.find();

    for (const grievance of grievances) {
      if (grievance.escalation_level === "escalated_l1") {
        escalatedL1++;
      } else if (grievance.escalation_level === "escalated_l2") {
        escalatedL2++;
      } else if (grievance.escalation_level === "escalated_l3") {
        escalatedL3++;
      }
    }

    const totalEscalated = escalatedL1 + escalatedL2 + escalatedL3;
    const percentageEscalated = (totalEscalated / totalGrievances) * 100;

    res.json({
      percentageEscalated: percentageEscalated.toFixed(2),
      totalGrievances: totalGrievances,
      escalatedL1: escalatedL1,
      escalatedL2: escalatedL2,
      escalatedL3: escalatedL3,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message:
          "Error fetching percentage of grievances escalated to higher authorities",
      });
  }
};

exports.ComparativeAnalysis = async (req, res, next) => {
  try {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    let previousMonth = currentMonth - 1;
    let previousYear = currentYear;

    if (currentMonth === 0) {
      previousMonth = 11;
      previousYear = currentYear - 1;
    }

    const lastDayOfMonth = (year, month) =>
      new Date(year, month + 1, 0, 23, 59, 59, 999);

    const currentMonthStart = new Date(currentYear, currentMonth, 1);
    const currentMonthEnd = new Date(
      lastDayOfMonth(currentYear, currentMonth) + 999
    );
    const previousMonthStart = new Date(previousYear, previousMonth, 1);
    const previousMonthEnd = new Date(
      lastDayOfMonth(previousYear, previousMonth) + 999
    );

    const currentMonthGrievances = await NewGrievanceModel.countDocuments({
      createdAt: { $gte: currentMonthStart, $lte: currentMonthEnd },
    });

    const previousMonthGrievances = await NewGrievanceModel.countDocuments({
      createdAt: { $gte: previousMonthStart, $lte: previousMonthEnd },
    });

    const currentMonthResolvedGrievances =
      await NewGrievanceModel.countDocuments({
        status: { $in: ["closed", "Closed", "CLOSED", "CLOSE"] },
        updatedAt: { $gte: currentMonthStart, $lte: currentMonthEnd },
      });

    const previousMonthResolvedGrievances =
      await NewGrievanceModel.countDocuments({
        status: { $in: ["closed", "Closed", "CLOSED", "CLOSE"] },
        updatedAt: { $gte: previousMonthStart, $lte: previousMonthEnd },
      });

    const currentMonthEscalatedGrievances =
      await NewGrievanceModel.countDocuments({
        escalation_level: { $ne: null },
        createdAt: { $gte: currentMonthStart, $lte: currentMonthEnd },
      });

    const previousMonthEscalatedGrievances =
      await NewGrievanceModel.countDocuments({
        escalation_level: { $ne: null },
        createdAt: { $gte: previousMonthStart, $lte: previousMonthEnd },
      });

    const currentMonthPercentageResolved =
      (currentMonthResolvedGrievances / currentMonthGrievances) * 100;
    const previousMonthPercentageResolved =
      (previousMonthResolvedGrievances / previousMonthGrievances) * 100;

    const currentMonthPercentageEscalated =
      (currentMonthEscalatedGrievances / currentMonthGrievances) * 100;
    const previousMonthPercentageEscalated =
      (previousMonthEscalatedGrievances / previousMonthGrievances) * 100;

    res.json({
      currentMonthGrievances: currentMonthGrievances,
      previousMonthGrievances: previousMonthGrievances,
      currentMonthResolvedGrievances: currentMonthResolvedGrievances,
      previousMonthResolvedGrievances: previousMonthResolvedGrievances,
      currentMonthEscalatedGrievances: currentMonthEscalatedGrievances,
      previousMonthEscalatedGrievances: previousMonthEscalatedGrievances,
      currentMonthPercentageResolved: currentMonthPercentageResolved.toFixed(2),
      previousMonthPercentageResolved:
        previousMonthPercentageResolved.toFixed(2),
      currentMonthPercentageEscalated:
        currentMonthPercentageEscalated.toFixed(2),
      previousMonthPercentageEscalated:
        previousMonthPercentageEscalated.toFixed(2),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching comparative analysis data" });
  }
};

exports.getGrievanceBynotClosed = async (req, res, next) => {
  try {
    const newGrievances = await NewGrievanceService.getGrievanceBynotClosed();
    const encryptedData = encryptData(newGrievances);
    res.status(200).json({
      status: true,
      message: "New grievances Not closed retrieved successfully",
      data: encryptedData,
    });
  } catch (error) {
    next(error);
  }
};

exports.getGrievanceByClosed = async (req, res, next) => {
  try {
    const newGrievances = await NewGrievanceService.getGrievanceByClosed();
    const encryptedData = encryptData(newGrievances);
    res.status(200).json({
      status: true,
      message: "New grievances Closed retrieved successfully",
      data: encryptedData,
    });
  } catch (error) {
    next(error);
  }
};

exports.getGrievanceBySeverityHigh = async (req, res, next) => {
  try {
    const newGrievances =
      await NewGrievanceService.getGrievanceBySeverityHigh();
    const encryptedData = encryptData(newGrievances);
    res.status(200).json({
      status: true,
      message: "New grievances High retrieved successfully",
      data: encryptedData,
    });
  } catch (error) {
    next(error);
  }
};

exports.getGrievanceBySeverityMedium = async (req, res, next) => {
  try {
    const newGrievances =
      await NewGrievanceService.getGrievanceBySeverityMedium();
    const encryptedData = encryptData(newGrievances);
    res.status(200).json({
      status: true,
      message: "New grievances Medium retrieved successfully",
      data: encryptedData,
    });
  } catch (error) {
    next(error);
  }
};

exports.getGrievanceBySeverityLow = async (req, res, next) => {
  try {
    const newGrievances = await NewGrievanceService.getGrievanceBySeverityLow();
    const encryptedData = encryptData(newGrievances);
    res.status(200).json({
      status: true,
      message: "New grievances Low retrieved successfully",
      data: encryptedData,
    });
  } catch (error) {
    next(error);
  }
};

exports.getGrievanceByReopen = async (req, res, next) => {
  try {
    const newGrievances = await NewGrievanceService.getGrievanceByReopen();
    const encryptedData = encryptData(newGrievances);
    res.status(200).json({
      status: true,
      message: "New grievances Reopen retrieved successfully",
      data: encryptedData,
    });
  } catch (error) {
    next(error);
  }
};

exports.getGrievanceByISReopen = async (req, res, next) => {
  try {
    const newGrievances = await NewGrievanceService.getGrievanceByIsReopen();
    const encryptedData = encryptData(newGrievances);
    res.status(200).json({
      status: true,
      message: "New grievances Reopen retrieved successfully",
      data: encryptedData,
    });
  } catch (error) {
    next(error);
  }
};

exports.departmentGrievanceCounts = async (req, res, next) => {
  try {
    const { startDate, endDate, department } = req.query;

    // Build match conditions based on filters
    const matchConditions = {};
    if (department) {
      matchConditions.dept_name = department;
    }
    if (startDate && endDate) {
      matchConditions.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // Aggregation pipeline
    const grievanceCounts = await NewGrievanceModel.aggregate([
      { $match: matchConditions },
      {
        $facet: {
          total: [
            {
              $group: {
                _id: "$dept_name", // Group by department
                count: { $sum: 1 },
                resolved: { $sum: { $cond: [{ $eq: ["$status", "closed"] }, 1, 0] } },
                pending: { $sum: { $cond: [{ $ne: ["$status", "closed"] }, 1, 0] } },
                escalated: { $sum: { $cond: [{ $eq: ["$isEsacalted", "yes"] }, 1, 0] } },
              },
            },
          ],
          repeated: [
            {
              $match: { isReopened: "yes" }, // Only grievances with isReopened = yes
            },
            {
              $group: {
                _id: "$dept_name",
                count: { $sum: 1 },
                resolved: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "closed"] }, 1, 0],
                  },
                },
                pending: {
                  $sum: {
                    $cond: [{ $ne: ["$status", "closed"] }, 1, 0],
                  },
                },
                escalated: {
                  $sum: {
                    $cond: [{ $eq: ["$isEsacalted", "yes"] }, 1, 0],
                  },
                },
              },
            },
          ],
        },
      },
    ]);

    // Transform data into the desired format
    const totalData = grievanceCounts[0].total || [];
    const repeatedData = grievanceCounts[0].repeated || [];

    const formattedData = totalData.map((totalItem) => {
      const repeatedItem = repeatedData.find(
        (r) => r._id === totalItem._id
      ) || {
        count: 0,
        resolved: 0,
        notClosed: 0,
        escalated: 0,
      };

      return {
        department: totalItem._id,
        total: {
          count: totalItem.count,
          resolved: totalItem.resolved,
          pending: totalItem.pending,
          escalated: totalItem.escalated,
        },
        repeated: {
          count: repeatedItem.count,
          resolved: repeatedItem.resolved,
          notClosed: repeatedItem.notClosed,
          escalated: repeatedItem.escalated,
        },
      };
    });

    res.json(formattedData);
  } catch (error) {
    console.error("Error getting department grievance counts:", error);
    res.status(500).json({ message: "Error retrieving department grievance counts" });
  }
};





