const encryptData = require('../encryptedData');
const GrievanceWorksheetService = require('../Service/grievance_worksheet_service');

exports.createGrievanceWorksheet = async (req, res, next) => {
    try {
        const { grievance_id, worksheet_name, created_by_user } = req.body;
        const grievanceWorksheet = await GrievanceWorksheetService.createGrievanceWorksheet({ grievance_id, worksheet_name, created_by_user });
        
        res.status(200).json({
            status: true,
            message: "Grievance worksheet created successfully",
           
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllGrievanceWorksheets = async (req, res, next) => {
    try {
        const grievanceWorksheets = await GrievanceWorksheetService.getAllGrievanceWorksheets();
        const encryptedData = encryptData(grievanceWorksheets)
        res.status(200).json({
            status: true,
            message: "Grievance worksheets retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};
exports.getGrievanceWorksheetById = async (req, res, next) => {
    try {
        const { grievance_id } = req.query;
        const grievanceWorksheet = await GrievanceWorksheetService.getGrievanceWorksheetById(grievance_id);
        if (!grievanceWorksheet) {
            return res.status(404).json({ status: false, message: "Grievance worksheet not found" });
        }
        const encryptedData = encryptData(grievanceWorksheet)
        res.status(200).json({
            status: true,
            message: "Grievance worksheet byID retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};
