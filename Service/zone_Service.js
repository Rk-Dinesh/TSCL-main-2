const ZoneModel = require('../Models/zone');

exports.createZone = async (zoneData) => {
    const zone = new ZoneModel(zoneData);
    return await zone.save();
};

exports.getAllZones = async () => {
    return await ZoneModel.find();
};

exports.getActiveZones = async () => {
    return await ZoneModel.find({status:'active'});
};

exports.getZoneById = async (zone_id) => {
    return await ZoneModel.findOne({ zone_id });
};

exports.updateZoneById = async (zone_id, updateData) => {
    return await ZoneModel.updateOne({ zone_id }, { $set: updateData });
  };

exports.deleteZoneById = async (zone_id) => {
    return await ZoneModel.findOneAndDelete({ zone_id });
};

exports.bulkInsert =  async(csvs) => {
    try {
        for (let csv of csvs) {
            csv.zone_id = await IdcodeServices.generateCode('Zone');
        }
        return await ZoneModel.insertMany(csvs);
    } catch (error) {
        throw error;
    }
}
