const StreetModel = require('../Models/street');

exports.createStreet = async (streetData) => {
    const street = new StreetModel(streetData);
    return await street.save();
};

exports.getAllStreets = async () => {
    return await StreetModel.find();
};

exports.getStreetById = async (ward_id, street_id) => {
    return await StreetModel.findOne({ ward_id, street_id });
};
exports.deleteStreetById = async (street_id) => {
    return await StreetModel.findOneAndDelete({ street_id });
};
