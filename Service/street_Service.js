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

exports.getStreetId = async ( street_id) => {
    return await StreetModel.findOne({street_id });
};

exports.updateStreetById = async (street_id, updateData) => {
    return await StreetModel.updateOne({ street_id }, { $set: updateData });
  };

exports.deleteStreetById = async (street_id) => {
    return await StreetModel.findOneAndDelete({ street_id });
};
