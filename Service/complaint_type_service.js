const ComplaintTypeModel = require("../Models/complaint_type");

exports.createComplaintType = async (complaintData) => {
    const complaintType = new ComplaintTypeModel(complaintData);
    return await complaintType.save();
};

exports.getAllComplaintsType = async () => {
    return await ComplaintTypeModel.find();
};