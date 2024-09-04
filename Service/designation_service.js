const DesignationModel = require("../Models/designation");

exports.createDesignation = async (complaintData) => {
    const designation = new DesignationModel(complaintData);
    return await designation.save();
};

exports.getAllDesignation = async () => {
    return await DesignationModel.find();
};
exports.getActiveDesignation = async () => {
    return await DesignationModel.find({status:'active'});
};
exports.getDesignationById = async (desgination_id) => {
    return await DesignationModel.findOne({ desgination_id });
};

exports.updateDesignationById = async (desgination_id, updateData) => {
    return await DesignationModel.updateOne({ desgination_id }, { $set: updateData });
  };
  
exports.deleteDesignationById = async (desgination_id) => {
    return await DesignationModel.findOneAndDelete({ desgination_id });
};