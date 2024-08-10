const NewGrievanceAttachmentService = require('../Service/new_grievance_attachment_service');

exports.createNewGrievanceAttachment = async (req, res, next) => {
    try {
        const { grievance_id, attachment_name, created_by_user } = req.body;
        const newGrievanceAttachment = await NewGrievanceAttachmentService.createNewGrievanceAttachment({ grievance_id, attachment_name, created_by_user });
        
        res.status(200).json({
            status: true,
            message: "New grievance attachment created successfully",
            data: newGrievanceAttachment
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllNewGrievanceAttachments = async (req, res, next) => {
    try {
        const newGrievanceAttachments = await NewGrievanceAttachmentService.getAllNewGrievanceAttachments();
        res.status(200).json({
            status: true,
            message: "New grievance attachments retrieved successfully",
            data: newGrievanceAttachments
        });
    } catch (error) {
        next(error);
    }
};
exports.getNewGrievanceAttachmentById = async (req, res, next) => {
    try {
        const { grievance_id } = req.query;
        const newGrievanceAttachment = await NewGrievanceAttachmentService.getNewGrievanceAttachmentById(grievance_id);
        if (!newGrievanceAttachment) {
            return res.status(404).json({ status: false, message: "New grievance attachment not found" });
        }
        res.status(200).json({
            status: true,
            message: "New grievance attachment retrieved successfully",
            data: newGrievanceAttachment
        });
    } catch (error) {
        next(error);
    }
};
