const WardModel = require('../Models/ward');

exports.createWard = async (wardData) => {
    const ward = new WardModel(wardData);
    return await ward.save();
};

exports.getAllWards = async () => {
    return await WardModel.find();
};

exports.getWardById = async (zone_id, ward_id) => {
    return await WardModel.findOne({ zone_id, ward_id });
};
exports.deleteWardById = async (ward_id) => {
    return await WardModel.findOneAndDelete({ ward_id });
};
