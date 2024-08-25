const ComplaintTypeModel = require("../Models/complaint_type");

exports.createComplaintType = async (complaintData) => {
    const complaintType = new ComplaintTypeModel(complaintData);
    return await complaintType.save();
};

exports.getAllComplaintsType = async () => {
    return await ComplaintTypeModel.find();
};
exports.getActiveComplaintsType = async () => {
    return await ComplaintTypeModel.find({status:'active'});
};
exports.getComplaintsTypeById = async (compliant_type_id) => {
    return await ComplaintTypeModel.findOne({ compliant_type_id });
};

exports.updateComplaintsTypeById = async (compliant_type_id, updateData) => {
    return await ComplaintTypeModel.updateOne({ compliant_type_id }, { $set: updateData });
  };
  
exports.deleteComplaintsTypeById = async (compliant_type_id) => {
    return await ComplaintTypeModel.findOneAndDelete({ compliant_type_id });
};