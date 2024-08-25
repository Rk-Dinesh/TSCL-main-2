const RoleModel = require('../Models/role');

exports.createRole = async (roleData) => {
    const role = new RoleModel(roleData);
    return await role.save();
};

exports.getAllRoles = async () => {
    return await RoleModel.find();
};
exports.getActiveRoles = async () => {
    return await RoleModel.find({status:'active'});
};
exports.getRoleById = async (role_id) => {
    return await RoleModel.findOne({ role_id });
};
exports.updateRoleById = async (role_id, updateData) => {
    return await RoleModel.updateOne({ role_id }, { $set: updateData });
  };
exports.deleteRoleById = async (role_id) => {
    return await RoleModel.findOneAndDelete({ role_id });
};
