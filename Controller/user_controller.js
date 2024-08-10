const UserService = require('../Service/user_service');
const IdcodeServices = require('../Service/idcode_Service');

exports.createUser = async (req, res, next) => {
    try {
        const { user_name, dept_name, phone, email, address, pincode, login_password, status, role,  created_by_user } = req.body;
        const user_id = await IdcodeServices.generateCode("User");
        const user = await UserService.createUser({ user_id, user_name, dept_name, phone, email, address, pincode, login_password, status, role,  created_by_user });
        
        res.status(200).json({
            status: true,
            message: "User created successfully",
            data: user
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await UserService.getAllUsers();
        res.status(200).json({
            status: true,
            message: "Users retrieved successfully",
            data: users
        });
    } catch (error) {
        next(error);
    }
};
exports.getUserById = async (req, res, next) => {
    try {
        const { user_id } = req.query;
        const zone = await UserService.getZoneById(user_id);
        if (!zone) {
            return res.status(404).json({ status: false, message: "Zone not found" });
        }
        res.status(200).json({
            status: true,
            message: "Zone retrieved successfully",
            data: zone
        });
    } catch (error) {
        next(error);
    }
};
exports.deleteUserById = async (req, res, next) => {
    try {
        const { user_id } = req.query;
        const result = await UserService.deleteUserById(user_id);
        if (!result) {
            return res.status(404).json({ status: false, message: "User not found" });
        }
        res.status(200).json({
            status: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};
