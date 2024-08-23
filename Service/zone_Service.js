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

exports.updateZoneById = async (zone_id, updateData) => {
    return await ZoneModel.updateOne({ zone_id }, { $set: updateData });
  };

exports.deleteZoneById = async (zone_id) => {
    return await ZoneModel.findOneAndDelete({ zone_id });
};
