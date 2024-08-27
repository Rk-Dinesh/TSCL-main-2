const NewGrievanceService = require('../Service/new_grievance_service');
const IdcodeServices = require('../Service/idcode_Service');
const encryptData = require('../encryptedData');

exports.createNewGrievance = async (req, res, next) => {
    try {
        const { grievance_mode,complaint_type_title, dept_name, zone_name, ward_name, street_name,pincode,complaint,complaint_details, public_user_id, public_user_name,phone,assign_user,assign_username,assign_userphone, status, escalation_level,statusflow,priority} = req.body;
        const grievance_id = await IdcodeServices.generateCode("NewGrievance");
        const newGrievance = await NewGrievanceService.createNewGrievance({ grievance_id,grievance_mode, complaint_type_title, dept_name, zone_name, ward_name, street_name,pincode,complaint,complaint_details, public_user_id, public_user_name,phone,assign_user,assign_username,assign_userphone, status, escalation_level,statusflow,priority});
        
        res.status(200).json({
            status: true,
            message: "New grievance created successfully",
            data: newGrievance.grievance_id
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllNewGrievances = async (req, res, next) => {
    try {
        const newGrievances = await NewGrievanceService.getAllNewGrievances();
        const encryptedData = encryptData(newGrievances)
        res.status(200).json({
            status: true,
            message: "New grievances retrieved successfully",
            data: encryptedData
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
        const encryptedData = encryptData(newGrievance)
        res.status(200).json({
            status: true,
            message: "New grievance retrieved successfully",
            data: encryptedData
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
        const encryptedData = encryptData(newGrievance)
        res.status(200).json({
            status: true,
            message: "New grievance retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.getGrievanceByUstatusClosedID = async (req, res, next) => {
    try {
        const { public_user_id } = req.query;
        const newGrievance = await NewGrievanceService.getGrievanceBystatusClosed(public_user_id);
        if (!newGrievance) {
            return res.status(404).json({ status: false, message: " grievance not found" });
        }
        const encryptedData = encryptData(newGrievance)
        res.status(200).json({
            status: true,
            message: "Status Closed grievance retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};


exports.getGrievanceByDept = async (req, res, next) => {
    try {
        const { dept_name } = req.query;
        const newGrievance = await NewGrievanceService.getGrievanceByDept(dept_name);
        if (!newGrievance) {
            return res.status(404).json({ status: false, message: " grievance not found" });
        }
        const encryptedData = encryptData(newGrievance)
        res.status(200).json({
            status: true,
            message: "Dept grievance retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.getGrievanceByAssign = async (req, res, next) => {
    try {
        const { assign_user } = req.query;
        const newGrievance = await NewGrievanceService.getGrievanceByAssign(assign_user);
        if (!newGrievance) {
            return res.status(404).json({ status: false, message: " grievance not found" });
        }
        const encryptedData = encryptData(newGrievance)
        res.status(200).json({
            status: true,
            message: "New grievance retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.updateStatus = async(req, res, next) => {
    try {
        const { grievance_id } = req.query;
        const { status } = req.body;

        const newGrievance = await NewGrievanceService.getNewGrievanceById(grievance_id);
        if (!newGrievance) {
            return res.status(404).json({ status: false, message: "Grievance not found" });
        }

        newGrievance.status = status;
        newGrievance.statusflow = `${newGrievance.statusflow ? newGrievance.statusflow + '/' : ''}${status}`;

        await newGrievance.save();

        return res.status(200).json({ status: true, message: "Status and status flow updated successfully" });
    } catch (error) {
        next(error);
    }
}

exports.updateAssign = async(req, res, next) => {
    try {
        const { grievance_id } = req.query;
        const { assign_user,assign_username,assign_userphone } = req.body;

        const newGrievance = await NewGrievanceService.getNewGrievanceById(grievance_id);
        if (!newGrievance) {
            return res.status(404).json({ status: false, message: "Grievance not found" });
        }

        newGrievance.assign_user = assign_user;
        newGrievance.assign_username = assign_username;
        newGrievance.assign_userphone= assign_userphone;

        await newGrievance.save();

        return res.status(200).json({ status: true, message: "Grievance Assigned successfully" });
    } catch (error) {
        next(error);
    }
}

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


