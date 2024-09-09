const NewGrievanceService = require('../Service/new_grievance_service');
const IdcodeServices = require('../Service/idcode_Service');
const encryptData = require('../encryptedData');
const UserModel = require('../Models/user');
const GrievanceLogModel = require('../Models/grievance_log');
const NewGrievanceModel = require('../Models/new_grievance');

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
        const { grievance_mode, complaint_type_title, dept_name, zone_name, ward_name, street_name, pincode, complaint, complaint_details, public_user_id, public_user_name, phone, status, escalation_level, statusflow, priority } = req.body;
        const grievance_id = await IdcodeServices.generateCode("NewGrievance");

        const user = await UserModel.findOne({ dept_name, ward_name: { $in: [ward_name] } });
        if (user) {
          
            var newGrievance = await NewGrievanceService.createNewGrievance({
                grievance_id,
                grievance_mode,
                complaint_type_title,
                dept_name,
                zone_name,
                ward_name,
                street_name,
                pincode,
                complaint,
                complaint_details,
                public_user_id,
                public_user_name,
                phone,
                assign_user: user.user_id,
                assign_username: user.user_name,
                assign_userphone: user.phone,
                status,
                escalation_level,
                statusflow,
                priority
            });
            const newLog = await GrievanceLogModel.create({
                grievance_id,
                log_details:`Work assigned automatically to ${user.user_name}`,
                created_by_user: public_user_name
            });
        } else {
            var newGrievance = await NewGrievanceService.createNewGrievance({
                grievance_id,
                grievance_mode,
                complaint_type_title,
                dept_name,
                zone_name,
                ward_name,
                street_name,
                pincode,
                complaint,
                complaint_details,
                public_user_id,
                public_user_name,
                phone,
                status,
                escalation_level,
                statusflow,
                priority
            });
        }

        res.status(200).json({
            status: true,
            message: "New grievance created successfully",
            data: newGrievance.grievance_id
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllNewGrievances = async (req, res, next) => {
    try {
        const newGrievances = await NewGrievanceService.getAllNewGrievances();
        const encryptedData = encryptData(newGrievances)
        res.status(200).json({
            status: true,
            message: "New grievances retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};
exports.getNewGrievanceById = async (req, res, next) => {
    try {
        const { grievance_id } = req.query;
        const newGrievance = await NewGrievanceService.getNewGrievanceById(grievance_id);
        if (!newGrievance) {
            return res.status(404).json({ status: false, message: "New grievance not found" });
        }
        const encryptedData = encryptData(newGrievance)
        res.status(200).json({
            status: true,
            message: "New grievance retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.getGrievanceByUserId = async (req, res, next) => {
    try {
        const { public_user_id } = req.query;
        const newGrievance = await NewGrievanceService.getGrievanceByUserId(public_user_id);
        if (!newGrievance) {
            return res.status(404).json({ status: false, message: " grievance not found" });
        }
        const encryptedData = encryptData(newGrievance)
        res.status(200).json({
            status: true,
            message: "New grievance retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.getGrievanceByUstatusClosedID = async (req, res, next) => {
    try {
        const { public_user_id } = req.query;
        const newGrievance = await NewGrievanceService.getGrievanceBystatusClosed(public_user_id);
        if (!newGrievance) {
            return res.status(404).json({ status: false, message: " grievance not found" });
        }
        const encryptedData = encryptData(newGrievance)
        res.status(200).json({
            status: true,
            message: "Status Closed grievance retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};


exports.getGrievanceByDept = async (req, res, next) => {
    try {
        const { dept_name } = req.query;
        const newGrievance = await NewGrievanceService.getGrievanceByDept(dept_name);
        if (!newGrievance) {
            return res.status(404).json({ status: false, message: " grievance not found" });
        }
        const encryptedData = encryptData(newGrievance)
        res.status(200).json({
            status: true,
            message: "Dept grievance retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.getGrievanceByAssign = async (req, res, next) => {
    try {
        const { assign_user } = req.query;
        const newGrievance = await NewGrievanceService.getGrievanceByAssign(assign_user);
        if (!newGrievance) {
            return res.status(404).json({ status: false, message: " grievance not found" });
        }
        const encryptedData = encryptData(newGrievance)
        res.status(200).json({
            status: true,
            message: "New grievance retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.updateStatus = async(req, res, next) => {
    try {
        const { grievance_id } = req.query;
        const { status } = req.body;

        const newGrievance = await NewGrievanceService.getNewGrievanceById(grievance_id);
        if (!newGrievance) {
            return res.status(404).json({ status: false, message: "Grievance not found" });
        }

        newGrievance.status = status;
        newGrievance.statusflow = `${newGrievance.statusflow ? newGrievance.statusflow + '/' : ''}${status}`;

        await newGrievance.save();

        return res.status(200).json({ status: true, message: "Status and status flow updated successfully" });
    } catch (error) {
        next(error);
    }
}

exports.updateTransfer = async(req, res, next) => {
    try {
        const { grievance_id } = req.query;
        const { dept_name,complaint } = req.body;

        const newGrievance = await NewGrievanceService.getNewGrievanceById(grievance_id);
        if (!newGrievance) {
            return res.status(404).json({ status: false, message: "Grievance not found" });
        }

        newGrievance.dept_name = dept_name;
        newGrievance.complaint = complaint;
        

        await newGrievance.save();

        return res.status(200).json({ status: true, message: "Transfered successfully" });
    } catch (error) {
        next(error);
    }
}

exports.updateAssign = async(req, res, next) => {
    try {
        const { grievance_id } = req.query;
        const { assign_user,assign_username,assign_userphone } = req.body;

        const newGrievance = await NewGrievanceService.getNewGrievanceById(grievance_id);
        if (!newGrievance) {
            return res.status(404).json({ status: false, message: "Grievance not found" });
        }

        newGrievance.assign_user = assign_user;
        newGrievance.assign_username = assign_username;
        newGrievance.assign_userphone= assign_userphone;

        await newGrievance.save();

        return res.status(200).json({ status: true, message: "Grievance Assigned successfully" });
    } catch (error) {
        next(error);
    }
}

exports.UpdateManyAssign = async (req, res, next) => {
  try {
    const { grievanceIds, assignUserDetails } = req.body;

    if (!grievanceIds || !Array.isArray(grievanceIds) || !assignUserDetails) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    const updates = grievanceIds.map((grievanceId) => {
      return {
        updateOne: {
          filter: { grievance_id: grievanceId },
          update: {
            $set: {
              assign_user: assignUserDetails.assign_user,
              assign_username: assignUserDetails.assign_username,
              assign_userphone: assignUserDetails.assign_userphone,
            },
          },
        },
      };
    });

    await NewGrievanceModel.bulkWrite(updates);

    res.json({ message: 'Grievances updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.UpdateManyTransfer = async (req, res, next) => {
  try {
    const { grievanceIds, transferDetails } = req.body;

    if (!grievanceIds || !Array.isArray(grievanceIds) || !transferDetails) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    const updates = grievanceIds.map((grievanceId) => {
      return {
        updateOne: {
          filter: { grievance_id: grievanceId },
          update: {
            $set: {
              dept_name: transferDetails.dept_name,
              complaint: transferDetails.complaint,
            },
          },
        },
      };
    });

    await NewGrievanceModel.bulkWrite(updates);

    res.json({ message: 'Grievances Transfer successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteNewGrievanceById = async (req, res, next) => {
    try {
        const { grievance_id } = req.query;
        const result = await NewGrievanceService.deleteNewGrievanceById(grievance_id);
        if (!result) {
            return res.status(404).json({ status: false, message: "New grievance not found" });
        }
        res.status(200).json({
            status: true,
            message: "New grievance deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

exports.filterGrievances = async (req, res, next) => {
    try {
      const { zone_name, ward_name, street_name, dept_name, complaint } = req.query;
      const filter = {};
  
      if (zone_name) filter.zone_name = zone_name;
      if (ward_name) filter.ward_name = ward_name;
      if (street_name) filter.street_name = street_name;
      if (dept_name) filter.dept_name = dept_name;
      if (complaint) filter.complaint = complaint;

      filter.status = { $nin: ['closed', 'Closed','CLOSE', 'CLOSED'] };
    
  
      const grievances = await NewGrievanceService.filterGrievances(filter);
      const encryptedData = encryptData(grievances)
      res.status(200).json({
        status: true,
        message: "New grievance Filtered successfully",
        data:encryptedData
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
              count: { $sum: 1 }
            }
          },
          {
            $sort: { count: -1 }
          }
        ]);
    
        // console.log('Aggregation pipeline executed successfully');
        // console.log('Ward grievance counts:', wardGrievanceCounts);
    
        res.json(wardGrievanceCounts);
      } catch (error) {
        console.error('Error getting ward grievance counts:', error);
        res.status(500).json({ message: 'Error retrieving ward grievance counts' });
      }
  };
  

// Get the most frequent complainants user by ward with name and count
exports.frequentComplainantsByuserinward = async (req, res, next) => {
    try {
        //console.log('Executing aggregation pipeline...');
        const frequentComplainantsByWard = await NewGrievanceModel.aggregate([
          {
            $group: {
              _id: { ward_name: "$ward_name", public_user_name: "$public_user_name" },
              count: { $sum: 1 }
            }
          },
          {
            $sort: { count: -1 }
          },
          {
            $group: {
              _id: "$_id.ward_name",
              frequentComplainants: { $push: { name: "$_id.public_user_name", count: "$count" } }
            }
          }
        ]);
    
        // console.log('Aggregation pipeline executed successfully');
        // console.log('Frequent complainants by ward:', frequentComplainantsByWard);
    
        res.json(frequentComplainantsByWard);
      } catch (error) {
        // console.error('Error getting frequent complainants by ward:', error);
        res.status(500).json({ message: 'Error retrieving frequent complainants by ward' });
      }
  };
  
exports.frequentComplainantsByWardAll = async (req, res, next) => {
    try {
      //console.log('Executing aggregation pipeline...');
      const frequentComplainantsByWard = await NewGrievanceModel.aggregate([
        {
          $group: {
            _id: { ward_name: "$ward_name", complaint: "$complaint" },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { count: -1 }
        },
        {
          $group: {
            _id: "$_id.ward_name",
            frequentComplaints: { $push: { complaint: "$_id.complaint", count: "$count" } }
          }
        }
      ]);
  
    //   console.log('Aggregation pipeline executed successfully');
    //   console.log('Frequent complaints by ward:', frequentComplainantsByWard);
  
      res.json(frequentComplainantsByWard);
    } catch (error) {
    //   console.error('Error getting frequent complaints by ward:', error);
      res.status(500).json({ message: 'Error retrieving frequent complaints by ward' });
    }
  }; 


exports.frequentComplainantsByWard = async (req, res, next) => {
    try {
      //console.log('Executing aggregation pipeline...');
      const frequentComplainantsByWard = await NewGrievanceModel.aggregate([
        {
          $group: {
            _id: { ward_name: "$ward_name", complaint: "$complaint" },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { count: -1 }
        },
        {
          $group: {
            _id: "$_id.ward_name",
            maxComplaint: { $first: { complaint: "$_id.complaint", count: "$count" } }
          }
        }
      ]);
  
    //   console.log('Aggregation pipeline executed successfully');
    //   console.log('Max complaint by ward:', frequentComplainantsByWard);
  
      res.json(frequentComplainantsByWard);
    } catch (error) {
    //   console.error('Error getting max complaint by ward:', error);
      res.status(500).json({ message: 'Error retrieving max complaint by ward' });
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
              count: { $sum: 1 }
            }
          },
          {
            $sort: { count: -1 }
          },
          {
            $limit: 10 // Adjust this limit as needed
          }
        ]);
    
        // console.log('Aggregation pipeline executed successfully');
        // console.log('Top grievances by public name:', topGrievancesByPublicName);
    
        res.json(topGrievancesByPublicName);
      } catch (error) {
        // console.error('Error getting top grievances by public name:', error);
        res.status(500).json({ message: 'Error retrieving top grievances by public name' });
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
              { $match: { status: { $in: ["closed", "Closed", "CLOSED", "CLOSE"] } } },
              { $count: "resolved" }
            ],
            pendingGrievances: [
              { $match: { status: { $not: { $in: ["closed", "Closed", "CLOSED", "CLOSE"] } } } },
              { $count: "pending" }
            ],
            escalatedGrievances: [
              { $match: { escalation_level: { $exists: true } } },
              { $count: "escalated" }
            ],
            highPriorityGrievances: [
              { $match: { priority: "High" } },
              { $count: "highPriority" }
            ]
          }
        }
      ]);
  
    //   console.log('Aggregation pipeline executed successfully');
    //   console.log('Grievance counts:', counts);
  
      res.json(counts[0]);
    } catch (error) {
    //   console.error('Error getting grievance counts:', error);
      res.status(500).json({ message: 'Error retrieving grievance counts' });
    }
  };

  exports.PriorityCounts = async (req, res, next) => {
    try {
      const priorityCounts = await NewGrievanceModel.aggregate([
        {
          $group: {
            _id: "$priority",
            count: { $sum: 1 }
          }
        }
      ]);
  
      const priorityArray = priorityCounts.map((priorityCount) => {
        return {
          priority: priorityCount._id,
          count: priorityCount.count
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
            count: { $sum: 1 }
          }
        },
        {
          $sort: { count: -1 }
        }
      ]);
  
      const locationCounts = topGrievancesByLocation.map((locationCount) => {
        return {
          zone: locationCount._id,
          count: locationCount.count
        };
      });
  
      res.json(locationCounts);
  
    } catch (error) {
    //   console.error("Error fetching top grievances by location:", error);
      res.status(500).json({ message: "Error fetching top grievances by location" });
    }
  };

  exports.TopGrievancescomplaint = async (req, res, next) => {
    try {
      const topGrievancesByComplaint = await NewGrievanceModel.aggregate([
        {
          $group: {
            _id: "$complaint",
            count: { $sum: 1 }
          }
        },
        {
          $sort: { count: -1 }
        }
      ]);
  
      const complaintCounts = topGrievancesByComplaint.map((complaintCount) => {
        return {
          complaint: complaintCount._id,
          count: complaintCount.count
        };
      });
  
      res.json(complaintCounts);
  
    } catch (error) {
      // console.error("Error fetching top grievances by complaint:", error);
      res.status(500).json({ message: "Error fetching top grievances by complaint" });
    }
  };