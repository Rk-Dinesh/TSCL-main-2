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
    return await NewGrievanceModel.find(filter,'createdAt grievance_id status complaint_details complaint dept_name');
  };  


  exports.getGrievanceBynotClosed = async () => {
    return await NewGrievanceModel.find({
      status: { $nin: ['closed', 'Closed', 'CLOSE', 'CLOSED'] }
    });
  };

  exports.getGrievanceByClosed = async () => {
    return await NewGrievanceModel.find({
      status: { $in: ['closed', 'Closed', 'CLOSE', 'CLOSED'] }
    });
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