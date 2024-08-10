const ZoneModel = require('../Models/zone');

exports.createZone = async (zoneData) => {
    const zone = new ZoneModel(zoneData);
    return await zone.save();
};

exports.getAllZones = async () => {
    return await ZoneModel.find();
};

exports.getZoneById = async (zone_id) => {
    return await ZoneModel.findOne({ zone_id });
};
exports.deleteZoneById = async (zone_id) => {
    return await ZoneModel.findOneAndDelete({ zone_id });
};
