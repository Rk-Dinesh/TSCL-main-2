const encryptData = require('../encryptedData');
const GrievanceLogService = require('../Service/grievance_log_service');

exports.createGrievanceLog = async (req, res, next) => {
    try {
        const { grievance_id, log_details, created_by_user } = req.body;
        const grievanceLog = await GrievanceLogService.createGrievanceLog({ grievance_id, log_details, created_by_user });
        
        res.status(200).json({
            status: true,
            message: "Grievance log created successfully",
            
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllGrievanceLogs = async (req, res, next) => {
    try {
        const grievanceLogs = await GrievanceLogService.getAllGrievanceLogs();
        const encryptedData = encryptData(grievanceLogs)
        res.status(200).json({
            status: true,
            message: "Grievance logs retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};
exports.getGrievanceLogById = async (req, res, next) => {
    try {
        const { grievance_id } = req.query;
        const grievanceLog = await GrievanceLogService.getGrievanceLogById(grievance_id);
        if (!grievanceLog) {
            return res.status(404).json({ status: false, message: "Grievance log not found" });
        }
        const encryptedData = encryptData(grievanceLog)
        res.status(200).json({
            status: true,
            message: "Grievance log by id retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};
