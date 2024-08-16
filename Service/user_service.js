const UserModel = require('../Models/user');
const IdcodeServices = require('./idcode_Service');
const bcrypt = require('bcrypt');

exports.createUser = async (user_name, dept_name, phone, email, address, pincode, login_password, status, role,  created_by_user) => {
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
            role,
            created_by_user
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

exports.getAllUsers = async () => {
    return await UserModel.find();
};
exports.deleteUserById = async (user_id) => {
    return await UserModel.findOneAndDelete({ user_id });
};

