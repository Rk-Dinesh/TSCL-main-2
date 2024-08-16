const PublicUserModel = require('../Models/public_user');
const bcrypt = require('bcrypt');
const IdcodeServices = require('./idcode_Service');


exports.createPublicUser = async (public_user_name, phone, email, address, pincode, login_password, verification_status, user_status) => {
    try {
        
        var public_user_id = await IdcodeServices.generateCode("PublicUser");
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(login_password, salt);

        const publicUser = new PublicUserModel({
            public_user_id,
            public_user_name,
            phone,
            email,
            address,
            pincode,
            login_password: hashedPassword,
            verification_status,
            user_status
        });

        return await publicUser.save();
    } catch (err) {
        throw err;
    }
};



exports.findPublicUserByPhone = async (phone) => {
    return await PublicUserModel.findOne({ phone });
};


exports.getAllPublicUsers = async () => {
    return await PublicUserModel.find();
};
exports.getPublicUserById = async (public_user_id) => {
    return await PublicUserModel.findOne({ public_user_id });
};
exports.deletePublicUserById = async (public_user_id) => {
    return await PublicUserModel.findOneAndDelete({ public_user_id });
};
