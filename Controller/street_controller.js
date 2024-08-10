const StreetService = require('../Service/street_Service');
const IdcodeServices = require('../Service/idcode_Service');

exports.createStreet = async (req, res, next) => {
    try {
        const { street_name, ward_id,status, created_by_user,ward_name,zone_id,zone_name } = req.body;
        const street_id = await IdcodeServices.generateCode("Street");
        const street = await StreetService.createStreet({ street_id, street_name, ward_id, status, created_by_user,ward_name,zone_id,zone_name });
        
        res.status(200).json({
            status: true,
            message: "Street created successfully",
            data: street
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllStreets = async (req, res, next) => {
    try {
        const streets = await StreetService.getAllStreets();
        res.status(200).json({
            status: true,
            message: "Streets retrieved successfully",
            data: streets
        });
    } catch (error) {
        next(error);
    }
};

exports.getStreetById = async (req, res, next) => {
    try {
        const { ward_id, street_id } = req.query;
        const street = await StreetService.getStreetById(ward_id, street_id);
        if (!street) {
            return res.status(404).json({ status: false, message: "Street not found" });
        }
        res.status(200).json({
            status: true,
            message: "Street retrieved successfully",
            data: street
        });
    } catch (error) {
        next(error);
    }
};
exports.deleteStreetById = async (req, res, next) => {
    try {
        const { street_id } = req.query;
        const result = await StreetService.deleteStreetById(street_id);
        if (!result) {
            return res.status(404).json({ status: false, message: "Street not found" });
        }
        res.status(200).json({
            status: true,
            message: "Street deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};
