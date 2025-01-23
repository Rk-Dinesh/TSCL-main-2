const NewGrievanceModel = require('../Models/new_grievance');

exports.createNewGrievance = async (newGrievanceData) => {
    const newGrievance = new NewGrievanceModel(newGrievanceData);
    return await newGrievance.save();
};

exports.getAllNewGrievances = async () => {
    return await NewGrievanceModel.find();
};
exports.getNewGrievanceById = async (grievance_id) => {
    return await NewGrievanceModel.findOne({ grievance_id });
};

exports.getNewGrievanceByPhone = async (phone) => {
  try {
    const grievances = await NewGrievanceModel.find({ phone })
      .sort({ _id: -1 })
      .limit(20); 

    return grievances
  } catch (error) {
    console.error("Error fetching grievances:", error);
    throw error; 
  }
};

exports.getGrievanceByUserIdfull = async (public_user_id) => {
  return await NewGrievanceModel.find({
    public_user_id,
  });
};


exports.getGrievanceByUserId = async (public_user_id) => {
    return await NewGrievanceModel.find({
      public_user_id,
      status: { $nin: ['closed', 'Closed', 'CLOSE', 'CLOSED'] }
    });
  };

exports.getGrievanceBystatusClosed = async (public_user_id) => {
    return await NewGrievanceModel.find({
        public_user_id,
        status: "closed"
    });
};


exports.getGrievanceByDept = async (dept_name) => {
    return await NewGrievanceModel.find({ dept_name });
};

exports.getGrievanceByOperator = async (filter) => {
  return await NewGrievanceModel.find(filter);
};

exports.getGrievanceByDeptnotClosed = async (dept_name) => {
  return await NewGrievanceModel.find({ 
    dept_name,
    status: { $nin: ['closed', 'Closed', 'CLOSE', 'CLOSED'] }
  });
};

exports.getGrievanceByDeptClosed = async (dept_name) => {
  return await NewGrievanceModel.find({ 
    dept_name,
    status: { $in: ['closed', 'Closed', 'CLOSE', 'CLOSED'] }
  });
};

exports.getGrievanceByAssign = async (assign_user) => {
    return await NewGrievanceModel.find({ assign_user });
};

exports.getGrievanceByAssignnotClosed = async (assign_user) => {
  return await NewGrievanceModel.find({ 
    assign_user,
    status: { $nin: ['closed', 'Closed', 'CLOSE', 'CLOSED'] }
  });
};

exports.getGrievanceByAssignClosed = async (assign_user) => {
  return await NewGrievanceModel.find({ 
    assign_user ,
    status: { $in: ['closed', 'Closed', 'CLOSE', 'CLOSED'] }
  });
};


exports.deleteNewGrievanceById = async (grievance_id) => {
    return await NewGrievanceModel.findOneAndDelete({ grievance_id });
};


exports.filterGrievances = async (filter) => {
    return await NewGrievanceModel.find(filter,'createdAt grievance_id status complaint_details complaint dept_name grievance_mode');
  };  


  exports.getGrievanceBynotClosed = async () => {
    return await NewGrievanceModel.find({
      status: { $nin: ['closed', 'Closed', 'CLOSE', 'CLOSED'] }
    });
  };

  exports.getGrievanceByClosed = async () => {
    return await NewGrievanceModel.find({
      status: { $in: ['closed', 'Closed', 'CLOSE', 'CLOSED'] }
    })
    .sort({ createdAt: -1 }) 
    .limit(1500); 
  };

  exports.getGrievanceBySeverityHigh = async () => {
    return await NewGrievanceModel.find({
      priority:'High'
    });
  };

  exports.getGrievanceBySeverityLow = async () => {
    return await NewGrievanceModel.find({
      priority:'Low'
    });
  };

  exports.getGrievanceBySeverityMedium = async () => {
    return await NewGrievanceModel.find({
      priority:'Medium'
    });
  };

  exports.getGrievanceByReopen = async () => {
    return await NewGrievanceModel.find({
      status:'Re-opened'
    });
  };

  exports.getGrievanceByIsReopen = async () => {
    return await NewGrievanceModel.find({
      isReopened:'yes'
    });
  };