const GrievanceStatusService = require('../Service/grievance_status_service');

exports.createGrievanceStatus = async (req, res, next) => {
    try {
        const { status_name, created_by_user } = req.body;
        const grievanceStatus = await GrievanceStatusService.createGrievanceStatus({ status_name, created_by_user });
        
        res.status(200).json({
            status: true,
            message: "Grievance status created successfully",
            data: grievanceStatus
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllGrievanceStatuses = async (req, res, next) => {
    try {
        const statuses = await GrievanceStatusService.getAllGrievanceStatuses();
        res.status(200).json({
            status: true,
            message: "Grievance statuses retrieved successfully",
            data: statuses
        });
    } catch (error) {
        next(error);
    }
};
