const UserModel = require('../Models/user');
const IdcodeServices = require('./idcode_Service');
const bcrypt = require('bcrypt');

exports.createUser = async (user_name, dept_name, phone, email, address, pincode, login_password, status,role_id, role,  created_by_user,zone_name,ward_name) => {
    try {
        
        var user_id = await IdcodeServices.generateCode("User");
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(login_password, salt);

        const user = new UserModel({
            user_id,
            user_name,
            dept_name,
            phone,
            email,
            address,
            pincode,
            login_password:hashedPassword,
            status,
            role_id,
            role,
            created_by_user,
            zone_name,
            ward_name
        });

        return await user.save();
    } catch (err) {
        throw err;
    }
};

exports.findUserByPhone = async (phone) => {
    return await UserModel.findOne({ phone });
};

exports.findUserByEmail = async (email) => {
    return await UserModel.findOne({ email });
};
exports.findUserById = async (user_id) => {
    return await UserModel.findOne({ user_id });
};
exports.findUserByDept = async (dept_name) => {
    return await UserModel.find({ dept_name });
};
exports.getAllUsers = async () => {
    return await UserModel.find();
};
exports.updateUserById = async (user_id, updateData) => {
    return await UserModel.updateOne({ user_id }, { $set: updateData });
  };
exports.deleteUserById = async (user_id) => {
    return await UserModel.findOneAndDelete({ user_id });
};

exports.updateUserRoleNameByRoleId = async (role_id, updateData) => {
    return await UserModel.updateMany({ role_id }, { $set: updateData });
};
exports.bulkInsert = async (csvs) => {
    try {
        for (let csv of csvs) {
            csv.user_id = await IdcodeServices.generateCode('User');
            const salt = await bcrypt.genSalt(10);
            csv.login_password = await bcrypt.hash(csv.login_password, salt);
        }
        return await UserModel.insertMany(csvs);
    } catch (error) {
        throw error;
    }
}
