const ZoneService = require('../Service/zone_Service');
const IdcodeServices = require('../Service/idcode_Service'); // Assuming this exists

exports.createZone = async (req, res, next) => {
    try {
        const { zone_name, status, created_by_user } = req.body;
        const zone_id = await IdcodeServices.generateCode("Zone");
        const zone = await ZoneService.createZone({ zone_id, zone_name, status, created_by_user });
        
        res.status(200).json({
            status: true,
            message: "Zone created successfully",
            data: zone
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllZones = async (req, res, next) => {
    try {
        const zones = await ZoneService.getAllZones();
        res.status(200).json({
            status: true,
            message: "Zones retrieved successfully",
            data: zones
        });
    } catch (error) {
        next(error);
    }
};

exports.getZoneById = async (req, res, next) => {
    try {
        const { zone_id } = req.query;
        const zone = await ZoneService.getZoneById(zone_id);
        if (!zone) {
            return res.status(404).json({ status: false, message: "Zone not found" });
        }
        res.status(200).json({
            status: true,
            message: "Zone retrieved successfully",
            data: zone
        });
    } catch (error) {
        next(error);
    }
};
exports.deleteZoneById = async (req, res, next) => {
    try {
        const { zone_id } = req.query;
        const result = await ZoneService.deleteZoneById(zone_id);
        if (!result) {
            return res.status(404).json({ status: false, message: "Zone not found" });
        }
        res.status(200).json({
            status: true,
            message: "Zone deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

