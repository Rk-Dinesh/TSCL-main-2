const PublicUserModel = require('../Models/public_user');
const bcrypt = require('bcrypt');
const IdcodeServices = require('./idcode_Service');


exports.createPublicUser = async (public_user_name, phone, email, address, pincode, login_password, verification_status, user_status,role) => {
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
            user_status,
            role
        });

        return await publicUser.save();
    } catch (err) {
        throw err;
    }
};



exports.findPublicUserByPhone = async (phone) => {
    return await PublicUserModel.findOne({ phone });
};

exports.findPublicUserByEmail = async (email) => {
    return await PublicUserModel.findOne({ email });
};


exports.getAllPublicUsers = async () => {
    return await PublicUserModel.find();
};
exports.getPublicUserById = async (public_user_id) => {
    return await PublicUserModel.findOne({ public_user_id });
};
exports.updatePublicUserById = async (public_user_id, updateData) => {
    return await PublicUserModel.updateOne({ public_user_id }, { $set: updateData });
  };
exports.deletePublicUserById = async (public_user_id) => {
    return await PublicUserModel.findOneAndDelete({ public_user_id });
};

exports.bulkInsert = async (csvs) => {
    try {
        for (let csv of csvs) {
            csv.public_user_id = await IdcodeServices.generateCode('PublicUser');
            const salt = await bcrypt.genSalt(10);
            csv.login_password = await bcrypt.hash(csv.login_password, salt);
        }
        return await PublicUserModel.insertMany(csvs);
    } catch (error) {
        throw error;
    }
}

