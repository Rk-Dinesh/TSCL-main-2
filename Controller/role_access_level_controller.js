const encryptData = require('../encryptedData');
const RoleAccessLevelModel = require('../Models/role_access_level');
const IdcodeServices = require('../Service/idcode_Service');
const RoleAccessLevelService = require('../Service/role_access_level_service');

exports.createRoleAccessLevel = async (req, res, next) => {
    try {
        const { role_name, accessLevels } = req.body;
        const role_id = await IdcodeServices.generateCode("RoleAccess");

        accessLevels.forEach((accessLevel) => {
            if (!accessLevel.permissions || accessLevel.permissions.length === 0) {
                throw new Error(`Permissions array is empty for feature ${accessLevel.feature}`);
            }
        });

        const roleAccessLevel = new RoleAccessLevelModel({
            role_id,
            role_name,
            accessLevels
        });

        const result = await roleAccessLevel.save();
        res.status(200).json({
            status: true,
            message: "Role access level created successfully",
            data: result
        });
    } catch (error) {
        next(error);
    }
};
exports.updateRoles = async (req, res, next) => {
    try {
      const { role_id } = req.query;
      const { role_name, accessLevels } = req.body;
  
    
      const role = await RoleAccessLevelService.getRoleById(role_id);
      if (!role) {
        return res.status(404).json({ status: false, message: "role not found" });
      }

      const UpdateRole = await RoleAccessLevelService.updateRoleAccessById(role, {
        role_name,
        accessLevels,
      });
  
      return res.status(200).json({ status: true, message: "role Updated successfully" });
    } catch (error) {
      next(error);
    }
  };

exports.getAllRoleAccessLevels = async (req, res, next) => {
    try {
        const roleAccessLevels = await RoleAccessLevelService.getAllRoleAccessLevels();
        const encryptedData = encryptData(roleAccessLevels)
        res.status(200).json({
            status: true,
            message: "Role access levels retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.getRoleById = async (req, res, next) => {
    try {
        const { role_id } = req.query;
        const role = await RoleAccessLevelService.getRoleById(role_id);
        if (!role) {
            return res.status(404).json({ status: false, message: "Role not found" });
        }
       const encryptedData = encryptData(role)
        res.status(200).json({
            status: true,
            message: "Role retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteRoleById = async (req, res, next) => {
    try {
        const { role_id } = req.query;
        const result = await RoleAccessLevelService.deleteRoleById(role_id);
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
