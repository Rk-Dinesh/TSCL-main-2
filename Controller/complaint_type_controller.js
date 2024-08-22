const encryptData = require('../encryptedData');
const ComplaintTypeService = require('../Service/complaint_type_service');
const IdcodeServices = require('../Service/idcode_Service');

exports.createComplaintType = async (req, res, next) => {
    try {
        const { complaint_type, created_by_user } = req.body;
        const compliant_type_id = await IdcodeServices.generateCode("ComplaintType");
        const complaint = await ComplaintTypeService.createComplaintType({ compliant_type_id, complaint_type, created_by_user});
        
        res.status(200).json({
            status: true,
            message: "ComplaintType created successfully"
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllComplaintsType = async (req, res, next) => {
    try {
        const complaints = await ComplaintTypeService.getAllComplaintsType();
        const encryptedData = encryptData(complaints)
        res.status(200).json({
            status: true,
            message: "ComplaintsType retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};