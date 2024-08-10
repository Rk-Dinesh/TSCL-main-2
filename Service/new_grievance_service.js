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
exports.deleteNewGrievanceById = async (grievance_id) => {
    return await NewGrievanceModel.findOneAndDelete({ grievance_id });
};
