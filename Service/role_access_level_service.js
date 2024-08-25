const RoleAccessLevelModel = require("../Models/role_access_level");

exports.updateRoleAccessById = async (role, updateData) => {
    const { role_name, accessLevels } = updateData;
    return await RoleAccessLevelModel.updateOne(
      { _id: role._id },
      { $set: {
          role_name,
          accessLevels
      }}
    );
  };
  
exports.getRoleById = async (role_id) => {
  return await RoleAccessLevelModel.findOne({ role_id });
};

exports.getAllRoleAccessLevels = async () => {
  return await RoleAccessLevelModel.find();
};
exports.getActiveRoleAccessLevels = async () => {
  return await RoleAccessLevelModel.find({status:'active'});
};

exports.deleteRoleById = async (role_id) => {
    return await RoleAccessLevelModel.findOneAndDelete({ role_id });
};
