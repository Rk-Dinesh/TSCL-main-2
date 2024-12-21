const WardModel = require('../Models/ward');
const ZoneModel = require('../Models/zone');
const IdcodeServices = require('./idcode_Service');

exports.createWard = async (wardData) => {
    const ward = new WardModel(wardData);
    return await ward.save();
};

exports.getAllWards = async () => {
    try {
        const wards = await WardModel.find();
        const sortedWards = wards.sort((a, b) => Number(a.ward_name) - Number(b.ward_name));
        return sortedWards;
    } catch (error) {
        throw new Error('Error fetching wards');
    }
};

exports.getActiveWards = async () => {
    return await WardModel.find({status:'active'});
};

exports.getActiveWardsGuest = async (zone_name) => {
    return await WardModel.find({ status: 'active', zone_name });
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

exports.bulkInsert = async (csvs, createdByUser) => {
    try {
        for (let csv of csvs) {
           
            const zone = await ZoneModel.findOne({
                zone_id: csv.zone_id,
                status: 'active',
                created_by_user: createdByUser,
            });

            if (!zone) {
                throw new Error(`Zone not found for zone_id: ${csv.zone_id}`);
            }

            const existingWard = await WardModel.findOne({ ward_name: csv.ward_name });
            if (existingWard) {
                throw new Error(`Duplicate ward_name: ${csv.ward_name}`);
            }

            csv.zone_name = zone.zone_name;
            csv.ward_id = await IdcodeServices.generateCode('Ward');
            csv.status = 'active'; 
            csv.created_by_user = createdByUser; 
        }
        return await WardModel.insertMany(csvs);
    } catch (error) {
        throw error;
    }
};

