const StatusModel = require("../Models/status_model");


exports.createstatus = async (statusData) => {
    const newstatus = new StatusModel(statusData);
    return await newstatus.save();
};

exports.getAllstatus = async () => {
    return await StatusModel.find();
};
exports.getActivestatus = async () => {
    return await StatusModel.find({status:'active'});
};
exports.getstatusById = async (status_id) => {
    return await StatusModel.findOne({ status_id });
};

exports.updatestatusById = async (status_id, updateData) => {
    return await StatusModel.updateOne({ status_id }, { $set: updateData });
  };
  
exports.deletestatusById = async (status_id) => {
    return await StatusModel.findOneAndDelete({ status_id });
};