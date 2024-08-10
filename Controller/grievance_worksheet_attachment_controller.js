const GrievanceWorksheetAttachmentService = require('../Service/grievance_worksheet_attachment_service');

exports.createGrievanceWorksheetAttachment = async (req, res, next) => {
    try {
        const { grievance_id, worksheet_id, attachment_name, created_by_user } = req.body;
        const grievanceWorksheetAttachment = await GrievanceWorksheetAttachmentService.createGrievanceWorksheetAttachment({ grievance_id, worksheet_id, attachment_name, created_by_user });
        
        res.status(200).json({
            status: true,
            message: "Grievance worksheet attachment created successfully",
            data: grievanceWorksheetAttachment
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllGrievanceWorksheetAttachments = async (req, res, next) => {
    try {
        const grievanceWorksheetAttachments = await GrievanceWorksheetAttachmentService.getAllGrievanceWorksheetAttachments();
        res.status(200).json({
            status: true,
            message: "Grievance worksheet attachments retrieved successfully",
            data: grievanceWorksheetAttachments
        });
    } catch (error) {
        next(error);
    }
};
exports.getGrievanceWorksheetAttachmentById = async (req, res, next) => {
    try {
        const { grievance_id } = req.query;
        const grievanceWorksheetAttachment = await GrievanceWorksheetAttachmentService.getGrievanceWorksheetAttachmentById(grievance_id);
        if (!grievanceWorksheetAttachment) {
            return res.status(404).json({ status: false, message: "Grievance worksheet attachment not found" });
        }
        res.status(200).json({
            status: true,
            message: "Grievance worksheet attachment retrieved successfully",
            data: grievanceWorksheetAttachment
        });
    } catch (error) {
        next(error);
    }
};
