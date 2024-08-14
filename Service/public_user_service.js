const PublicUserModel = require('../Models/public_user');

exports.createPublicUser = async (publicUserData) => {
    const publicUser = new PublicUserModel(publicUserData);
    return await publicUser.save();
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
