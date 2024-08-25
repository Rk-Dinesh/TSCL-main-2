const WardModel = require('../Models/ward');

exports.createWard = async (wardData) => {
    const ward = new WardModel(wardData);
    return await ward.save();
};

exports.getAllWards = async () => {
    return await WardModel.find();
};

exports.getActiveWards = async () => {
    return await WardModel.find({status:'active'});
};

exports.getWardById = async (zone_id, ward_id) => {
    return await WardModel.findOne({ zone_id, ward_id });
};

exports.getWardId = async (ward_id) => {
    return await WardModel.findOne({ ward_id });
};

exports.updateWardById = async (ward_id, updateData) => {
    return await WardModel.updateOne({ ward_id }, { $set: updateData });
  };
exports.deleteWardById = async (ward_id) => {
    return await WardModel.findOneAndDelete({ ward_id });
};
