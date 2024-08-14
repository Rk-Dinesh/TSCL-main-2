const PublicUserService = require('../Service/public_user_service');
const IdcodeServices = require('../Service/idcode_Service');

exports.createPublicUser = async (req, res, next) => {
    try {
        const { public_user_name, phone, email, address, pincode, login_password, verification_status, user_status } = req.body;

        const existingUser = await PublicUserService.findPublicUserByPhone(phone);
        if (existingUser) {
            return res.status(200).json({
                status: true,
                message: "User with this phone number already exists",
                data: existingUser
            });
        }
        const public_user_id = await IdcodeServices.generateCode("PublicUser");
        const publicUser = await PublicUserService.createPublicUser({
            public_user_id,
            public_user_name,
            phone,
            email,
            address,
            pincode,
            login_password,
            verification_status,
            user_status
        });

        // Respond with success
        res.status(200).json({
            status: true,
            message: "Public user created successfully",
            data: publicUser
        });
    } catch (error) {
        next(error);
    }
};


exports.getAllPublicUsers = async (req, res, next) => {
    try {
        const publicUsers = await PublicUserService.getAllPublicUsers();
        res.status(200).json({
            status: true,
            message: "Public users retrieved successfully",
            data: publicUsers
        });
    } catch (error) {
        next(error);
    }
};
exports.getPublicUserById = async (req, res, next) => {
    try {
        const { public_user_id } = req.query;
        const publicUser = await PublicUserService.getPublicUserById(public_user_id);
        if (!publicUser) {
            return res.status(404).json({ status: false, message: "Public user not found" });
        }
        res.status(200).json({
            status: true,
            message: "Public user retrieved successfully",
            data: publicUser
        });
    } catch (error) {
        next(error);
    }
};
exports.deletePublicUserById = async (req, res, next) => {
    try {
        const { public_user_id } = req.query;
        const result = await PublicUserService.deletePublicUserById(public_user_id);
        if (!result) {
            return res.status(404).json({ status: false, message: "Public user not found" });
        }
        res.status(200).json({
            status: true,
            message: "Public user deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};
