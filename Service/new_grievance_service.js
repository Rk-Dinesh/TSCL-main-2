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
    return await NewGrievanceModel.find({ public_user_id });
};

exports.getGrievanceByDept = async (dept_name) => {
    return await NewGrievanceModel.find({ dept_name });
};

exports.getGrievanceByAssign = async (assign_user) => {
    return await NewGrievanceModel.find({ assign_user });
};


exports.deleteNewGrievanceById = async (grievance_id) => {
    return await NewGrievanceModel.findOneAndDelete({ grievance_id });
};
