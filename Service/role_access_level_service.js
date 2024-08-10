const RoleAccessLevelModel = require('../Models/role_access_level');

exports.createRoleAccessLevel = async (roleAccessLevelData) => {
    const roleAccessLevel = new RoleAccessLevelModel(roleAccessLevelData);
    return await roleAccessLevel.save();
};

exports.getAllRoleAccessLevels = async () => {
    return await RoleAccessLevelModel.find();
};
