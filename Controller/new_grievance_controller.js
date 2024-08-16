const NewGrievanceService = require('../Service/new_grievance_service');
const IdcodeServices = require('../Service/idcode_Service');

exports.createNewGrievance = async (req, res, next) => {
    try {
        const { grievance_mode,complaint_type_title, dept_name, zone_name, ward_name, street_name,pincode,complaint,complaint_details, public_user_id, public_user_name,phone,assign_user,assign_username, status, escalation_level,statusflow,priority} = req.body;
        const grievance_id = await IdcodeServices.generateCode("NewGrievance");
        const newGrievance = await NewGrievanceService.createNewGrievance({ grievance_id,grievance_mode, complaint_type_title, dept_name, zone_name, ward_name, street_name,pincode,complaint,complaint_details, public_user_id, public_user_name,phone,assign_user,assign_username, status, escalation_level,statusflow,priority});
        
        res.status(200).json({
            status: true,
            message: "New grievance created successfully",
            data: newGrievance
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllNewGrievances = async (req, res, next) => {
    try {
        const newGrievances = await NewGrievanceService.getAllNewGrievances();
        res.status(200).json({
            status: true,
            message: "New grievances retrieved successfully",
            data: newGrievances
        });
    } catch (error) {
        next(error);
    }
};
exports.getNewGrievanceById = async (req, res, next) => {
    try {
        const { grievance_id } = req.query;
        const newGrievance = await NewGrievanceService.getNewGrievanceById(grievance_id);
        if (!newGrievance) {
            return res.status(404).json({ status: false, message: "New grievance not found" });
        }
        res.status(200).json({
            status: true,
            message: "New grievance retrieved successfully",
            data: newGrievance
        });
    } catch (error) {
        next(error);
    }
};

exports.getGrievanceByUserId = async (req, res, next) => {
    try {
        const { public_user_id } = req.query;
        const newGrievance = await NewGrievanceService.getGrievanceByUserId(public_user_id);
        if (!newGrievance) {
            return res.status(404).json({ status: false, message: " grievance not found" });
        }
        res.status(200).json({
            status: true,
            message: "New grievance retrieved successfully",
            data: newGrievance
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteNewGrievanceById = async (req, res, next) => {
    try {
        const { grievance_id } = req.query;
        const result = await NewGrievanceService.deleteNewGrievanceById(grievance_id);
        if (!result) {
            return res.status(404).json({ status: false, message: "New grievance not found" });
        }
        res.status(200).json({
            status: true,
            message: "New grievance deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};


