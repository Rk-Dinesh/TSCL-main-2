const ComplaintModel = require('../Models/complaint');
const IdcodeServices = require('./idcode_Service');

exports.createComplaint = async (complaintData) => {
    const complaint = new ComplaintModel(complaintData);
    return await complaint.save();
};

exports.getAllComplaints = async () => {
    return await ComplaintModel.find();
};
exports.getActiveComplaints = async () => {
    return await ComplaintModel.find({status:'active'});
};
exports.getActiveComplaintsByDept = async (dept_name) => {
    return await ComplaintModel.find({status:'active',dept_name});
};
exports.getComplaintById = async (complaint_id) => {
    return await ComplaintModel.findOne({ complaint_id });
};
exports.updateComplaintsById = async (complaint_id, updateData) => {
    return await ComplaintModel.updateOne({ complaint_id }, { $set: updateData });
  };
exports.deleteComplaintById = async (complaint_id) => {
    return await ComplaintModel.findOneAndDelete({ complaint_id });
};

exports.bulkInsert =  async(csvs) => {
    try {
        for (let csv of csvs) {
            csv.complaint_id = await IdcodeServices.generateCode('Complaint');
        }
        return await ComplaintModel.insertMany(csvs);
    } catch (error) {
        throw error;
    }
}
