const GrievanceWorksheetAttachmentModel = require('../Models/grievance_worksheet_attachment');

exports.createGrievanceWorksheetAttachment = async (grievanceWorksheetAttachmentData) => {
    const grievanceWorksheetAttachment = new GrievanceWorksheetAttachmentModel(grievanceWorksheetAttachmentData);
    return await grievanceWorksheetAttachment.save();
};

exports.getAllGrievanceWorksheetAttachments = async () => {
    return await GrievanceWorksheetAttachmentModel.find();
};
exports.getGrievanceWorksheetAttachmentById = async (grievance_id) => {
    return await GrievanceWorksheetAttachmentModel.findOne({ grievance_id });
};

