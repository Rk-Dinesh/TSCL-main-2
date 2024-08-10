const RoleAccessLevelService = require('../Service/role_access_level_service');

exports.createRoleAccessLevel = async (req, res, next) => {
    try {
        const { role_id, feature_access, access_type, status, created_by_user } = req.body;
        const roleAccessLevel = await RoleAccessLevelService.createRoleAccessLevel({
            role_id, feature_access, access_type, status, created_by_user
        });

        res.status(200).json({
            status: true,
            message: "Role access level created successfully",
            data: roleAccessLevel
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllRoleAccessLevels = async (req, res, next) => {
    try {
        const roleAccessLevels = await RoleAccessLevelService.getAllRoleAccessLevels();
        res.status(200).json({
            status: true,
            message: "Role access levels retrieved successfully",
            data: roleAccessLevels
        });
    } catch (error) {
        next(error);
    }
};
