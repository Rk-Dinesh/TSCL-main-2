const RoleService = require('../Service/role_service');
const IdcodeServices = require('../Service/idcode_Service');
exports.createRole = async (req, res, next) => {
    try {
        const {role_name, status, created_by_user } = req.body;
        const role_id = await IdcodeServices.generateCode("Role");
        const role = await RoleService.createRole({ role_id, role_name, status, created_by_user });

        res.status(200).json({
            status: true,
            message: "Role created successfully",
            data: role
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllRoles = async (req, res, next) => {
    try {
        const roles = await RoleService.getAllRoles();
        res.status(200).json({
            status: true,
            message: "Roles retrieved successfully",
            data: roles
        });
    } catch (error) {
        next(error);
    }
};
exports.getRoleById = async (req, res, next) => {
    try {
        const { role_id } = req.query;
        const role = await RoleService.getRoleById(role_id);
        if (!role) {
            return res.status(404).json({ status: false, message: "Role not found" });
        }
        res.status(200).json({
            status: true,
            message: "Role retrieved successfully",
            data: role
        });
    } catch (error) {
        next(error);
    }
};
exports.deleteRoleById = async (req, res, next) => {
    try {
        const { role_id } = req.query;
        const result = await RoleService.deleteRoleById(role_id);
        if (!result) {
            return res.status(404).json({ status: false, message: "Role not found" });
        }
        res.status(200).json({
            status: true,
            message: "Role deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};
