const UserModel = require('../Models/user');
const UserService = require('../Service/user_service');
const bcrypt = require('bcrypt');


exports.createUser = async (req, res, next) => {
    try {
        const { user_name, dept_name, phone, email, address, pincode, login_password, status, role,  created_by_user } = req.body;

        const existingUser = await UserService.findUserByPhone(phone);
        if (existingUser) {
            return res.status(200).json({
                status: true,
                message: "User with this phone number already exists",
                data: existingUser
            });
        }

        const existingUser1 = await UserService.findUserByEmail(email);
        if (existingUser1) {
            return res.status(200).json({
                status: true,
                message: "User with this Email already exists",
                data: existingUser1
            });
        }

        const adminUser = await UserService.createUser(
            user_name,
            dept_name,
            phone,
            email,
            address,
            pincode,
            login_password,
            status,
            role,
            created_by_user
        );

        res.status(200).json({
            status: true,
            message: "Admin created successfully",
            data: adminUser
        });
    } catch (error) {
        next(error);
    }
};

exports.loginUser = async (req, res, next) => {
    try {
      const { identifier, login_password } = req.body;
  
      if (!identifier || !login_password) {
        return res.status(400).json({ status: false, message: "Identifier (phone or username) and password are required" });
      }
  
      let user;
      if (identifier.match(/^\d+$/)) { 
        user = await UserModel.findOne({ phone: identifier });
      } else {
        user = await UserModel.findOne({ email: identifier });
      }
  
      if (!user) {
        return res.status(401).json({ status: false, message: "Invalid identifier or password" });
      }
  
      const isValidPassword = await bcrypt.compare(login_password, user.login_password);
      if (!isValidPassword) {
        return res.status(401).json({ status: false, message: "Invalid identifier or password" });
      }
  
      res.status(200).json({
        status: true,
        message: "User logged in successfully",
        data: user
      });
    } catch (error) {
      next(error);
    }
  };

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await UserService.getAllUsers();
        res.status(200).json({
            status: true,
            message: "Users retrieved successfully",
            data: users
        });
    } catch (error) {
        next(error);
    }
};
exports.getUserById = async (req, res, next) => {
    try {
        const { user_id } = req.query;
        const zone = await UserService.getZoneById(user_id);
        if (!zone) {
            return res.status(404).json({ status: false, message: "Zone not found" });
        }
        res.status(200).json({
            status: true,
            message: "Zone retrieved successfully",
            data: zone
        });
    } catch (error) {
        next(error);
    }
};
exports.deleteUserById = async (req, res, next) => {
    try {
        const { user_id } = req.query;
        const result = await UserService.deleteUserById(user_id);
        if (!result) {
            return res.status(404).json({ status: false, message: "User not found" });
        }
        res.status(200).json({
            status: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};
