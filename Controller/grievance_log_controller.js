const GrievanceLogService = require('../Service/grievance_log_service');

exports.createGrievanceLog = async (req, res, next) => {
    try {
        const { grievance_id, log_details, created_by_user } = req.body;
        const grievanceLog = await GrievanceLogService.createGrievanceLog({ grievance_id, log_details, created_by_user });
        
        res.status(200).json({
            status: true,
            message: "Grievance log created successfully",
            data: grievanceLog
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllGrievanceLogs = async (req, res, next) => {
    try {
        const grievanceLogs = await GrievanceLogService.getAllGrievanceLogs();
        res.status(200).json({
            status: true,
            message: "Grievance logs retrieved successfully",
            data: grievanceLogs
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
        res.status(200).json({
            status: true,
            message: "Grievance log retrieved successfully",
            data: grievanceLog
        });
    } catch (error) {
        next(error);
    }
};
