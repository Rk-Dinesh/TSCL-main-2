const NewGrievanceService = require('../Service/new_grievance_service');
const IdcodeServices = require('../Service/idcode_Service');
const encryptData = require('../encryptedData');
const UserModel = require('../Models/user');
const GrievanceLogModel = require('../Models/grievance_log');
const NewGrievanceModel = require('../Models/new_grievance');
const ComplaintModel = require('../Models/complaint');

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

  exports.EngineerWorkload = async (req, res, next) => {
    try {
      const engineerWorkload = await NewGrievanceModel.aggregate([
        {
          $group: {
            _id: {
              $ifNull: ["$assign_username", "Yet to be assigned"]
            },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { count: -1 }
        }
      ]);
  
      const engineerCounts = engineerWorkload.map((engineerCount) => {
        return {
          engineer: engineerCount._id,
          count: engineerCount.count
        };
      });
  
      res.json(engineerCounts);
  
    } catch (error) {
      res.status(500).json({ message: "Error fetching engineer workload" });
    }
  };

  exports.AverageResolutionTimeByEngineerByDepartment = async (req, res, next) => {
    try {
      const averageResolutionTimeByEngineerByDepartment = await NewGrievanceModel.aggregate([
        {
          $match: {
            status: "closed" 
          }
        },
        {
          $group: {
            _id: {
              engineer: "$assign_username",
              department: "$dept_name"
            },
            averageResolutionTime: {
              $avg: {
                $divide: [
                  { $subtract: ["$updatedAt", "$createdAt"] },
                  86400000  // convert milliseconds to hours
                ]
              }
            }
          }
        },
        {
          $sort: {
            "_id.department": 1,
            "_id.engineer": 1
          }
        }
      ]);
  
      const averageResolutionTimeByEngineerByDepartmentArray = averageResolutionTimeByEngineerByDepartment.map((doc) => {
        return {
          department: doc._id.department,
          engineer: doc._id.engineer,
          averageResolutionTime: doc.averageResolutionTime
        };
      });
  
      res.json(averageResolutionTimeByEngineerByDepartmentArray);
  
    } catch (error) {
      res.status(500).json({ message: "Error fetching average resolution time by engineer by department" });
    }
  };


  exports.PercentageOfGrievancesResolvedWithinSpecifiedPeriodByDepartmentAndComplaintType = async (req, res, next) => {
    try {
      let totalGrievancesReceived = 0;
      let totalGrievancesResolvedWithinPeriod = 0;
  
      const grievances = await NewGrievanceModel.find();
  
      const uniqueKeys = {};
  
      for (const grievance of grievances) {
        const complaintData = await ComplaintModel.findOne({
          complaint_type_title: grievance.complaint
        });
  
        if (!complaintData) {
          console.log("Complaint data not found for grievance id: " + grievance.grievance_id);
          continue;
        }
  
        const department = grievance.dept_name;
        const complaintType = grievance.complaint;
        const escalationType = complaintData.escalation_type;
        const escalationL1 = complaintData.escalation_l1;
  
        let periodInDays;
        if (escalationType === 'day') {
          periodInDays = escalationL1;
        } else if (escalationType === 'month') {
          periodInDays = escalationL1 * 30; // assume 30 days in a month
        } else if (escalationType === 'minute') {
          periodInDays = escalationL1 / 1440; // convert minutes to days
        }
  
        const key = `${department}_${complaintType}`;
  
        if (!uniqueKeys[key]) {
          uniqueKeys[key] = true;
  
          const grievancesReceived = await NewGrievanceModel.countDocuments({
            dept_name: department,
            complaint: complaintType
          });
  
          const grievancesResolvedWithinPeriod = await NewGrievanceModel.countDocuments({
            dept_name: department,
            complaint: complaintType,
            status: "closed",
            updatedAt: { $gte: new Date(Date.now() - periodInDays * 24 * 60 * 60 * 1000) }
          });
  
          totalGrievancesReceived += grievancesReceived;
          totalGrievancesResolvedWithinPeriod += grievancesResolvedWithinPeriod;
  
          // console.log({
          //   department,
          //   complaintType,
          //   grievancesReceived,
          //   grievancesResolvedWithinPeriod
          // });
        }
      }
  
      const totalPercentageResolved = (totalGrievancesResolvedWithinPeriod / totalGrievancesReceived) * 100;
  
      res.json({
        totalPercentageResolved: totalPercentageResolved.toFixed(2),
        totalGrievancesReceived: totalGrievancesReceived,
        totalGrievancesResolvedWithinPeriod: totalGrievancesResolvedWithinPeriod
      });
  
    } catch (error) {
      res.status(500).json({ message: "Error fetching percentage of grievances resolved within specified period" });
    }
  };


  exports.PercentageOfGrievancesEscalatedToHigherAuthorities = async (req, res, next) => {
    try {
      const totalGrievances = await NewGrievanceModel.countDocuments();
      let escalatedL1 = 0;
      let escalatedL2 = 0;
      let escalatedL3 = 0;
  
      const grievances = await NewGrievanceModel.find();
  
      for (const grievance of grievances) {
        if (grievance.escalation_level === 'escalated_l1') {
          escalatedL1++;
        } else if (grievance.escalation_level === 'escalated_l2') {
          escalatedL2++;
        } else if (grievance.escalation_level === 'escalated_l3') {
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
        escalatedL3: escalatedL3
      });
  
    } catch (error) {
      res.status(500).json({ message: "Error fetching percentage of grievances escalated to higher authorities" });
    }
  };

  exports.ComparativeAnalysis = async (req, res, next) => {
    try {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  
      const currentMonthStart = new Date(currentYear, currentMonth, 1);
      const currentMonthEnd = new Date(currentYear, currentMonth + 1, 0);
      const previousMonthStart = new Date(previousYear, previousMonth, 1);
      const previousMonthEnd = new Date(previousYear, previousMonth + 1, 0);
  
      const currentMonthGrievances = await NewGrievanceModel.countDocuments({
        createdAt: { $gte: currentMonthStart, $lte: currentMonthEnd }
      });
  
      const previousMonthGrievances = await NewGrievanceModel.countDocuments({
        createdAt: { $gte: previousMonthStart, $lte: previousMonthEnd }
      });
  
      const currentMonthResolvedGrievances = await NewGrievanceModel.countDocuments({
        status: 'closed',
        updatedAt: { $gte: currentMonthStart, $lte: currentMonthEnd }
      });
  
      const previousMonthResolvedGrievances = await NewGrievanceModel.countDocuments({
        status: 'closed',
        updatedAt: { $gte: previousMonthStart, $lte: previousMonthEnd }
      });
  
      const currentMonthEscalatedGrievances = await NewGrievanceModel.countDocuments({
        escalation_level: { $ne: null },
        createdAt: { $gte: currentMonthStart, $lte: currentMonthEnd }
      });
  
      const previousMonthEscalatedGrievances = await NewGrievanceModel.countDocuments({
        escalation_level: { $ne: null },
        createdAt: { $gte: previousMonthStart, $lte: previousMonthEnd }
      });
  
      const currentMonthPercentageResolved = (currentMonthResolvedGrievances / currentMonthGrievances) * 100;
      const previousMonthPercentageResolved = (previousMonthResolvedGrievances / previousMonthGrievances) * 100;
  
      const currentMonthPercentageEscalated = (currentMonthEscalatedGrievances / currentMonthGrievances) * 100;
      const previousMonthPercentageEscalated = (previousMonthEscalatedGrievances / previousMonthGrievances) * 100;
  
      res.json({
        currentMonthGrievances: currentMonthGrievances,
        previousMonthGrievances: previousMonthGrievances,
        currentMonthResolvedGrievances: currentMonthResolvedGrievances,
        previousMonthResolvedGrievances: previousMonthResolvedGrievances,
        currentMonthEscalatedGrievances: currentMonthEscalatedGrievances,
        previousMonthEscalatedGrievances: previousMonthEscalatedGrievances,
        currentMonthPercentageResolved: currentMonthPercentageResolved.toFixed(2),
        previousMonthPercentageResolved: previousMonthPercentageResolved.toFixed(2),
        currentMonthPercentageEscalated: currentMonthPercentageEscalated.toFixed(2),
        previousMonthPercentageEscalated: previousMonthPercentageEscalated.toFixed(2)
      });
  
    } catch (error) {
      res.status(500).json({ message: "Error fetching comparative analysis data" });
    }
  };