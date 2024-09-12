const StreetModel = require('../Models/street');
const IdcodeServices = require('./idcode_Service');

exports.createStreet = async (streetData) => {
    const street = new StreetModel(streetData);
    return await street.save();
};

exports.getAllStreets = async () => {
    return await StreetModel.find();
};

exports.getActiveStreets = async () => {
    return await StreetModel.find({status:'active'});
};

exports.getActive = async (ward_name) => {
    return await StreetModel.find({status:'active',ward_name});
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

exports.bulkInsert =  async(csvs) => {
    try {
        for (let csv of csvs) {
            csv.street_id = await IdcodeServices.generateCode('Street');
        }
        return await StreetModel.insertMany(csvs);
    } catch (error) {
        throw error;
    }
}
