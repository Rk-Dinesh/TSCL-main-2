const ComplaintModel = require('../Models/complaint');

exports.createComplaint = async (complaintData) => {
    const complaint = new ComplaintModel(complaintData);
    return await complaint.save();
};

exports.getAllComplaints = async () => {
    return await ComplaintModel.find();
};
exports.getComplaintById = async (complaint_id) => {
    return await ComplaintModel.findOne({ complaint_id });
};
exports.deleteComplaintById = async (complaint_id) => {
    return await ComplaintModel.findOneAndDelete({ complaint_id });
};
