const encryptData = require('../encryptedData');
const UserModel = require('../Models/user');
const UserService = require('../Service/user_service');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


exports.createUser = async (req, res, next) => {
    try {
        const { user_name, dept_name, phone, email, address, pincode, login_password, status,role_id, role,  created_by_user } = req.body;

        const existingUser = await UserService.findUserByPhone(phone);
        if (existingUser) {
            return res.status(200).json({
                status: true,
                message: "User with this phone number already exists"
            });
        }

        const existingUser1 = await UserService.findUserByEmail(email);
        if (existingUser1) {
            return res.status(200).json({
                status: true,
                message: "User with this Email already exists"
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
            role_id,
            role,
            created_by_user
        );

        res.status(200).json({
            status: true,
            message: "Admin created successfully"
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

  exports.loginUserweb = async (req, res, next) => {
    try {
      const { identifier, login_password } = req.body;
  
      if (!identifier || !login_password) {
        return res
          .status(400)
          .json({
            status: false,
            message: "Identifier (phone or username) and password are required",
          });
      }
  
      let user;
      if (identifier.match(/^\d+$/)) {
        user = await UserModel.findOne({ phone: identifier });
      } else {
        user = await UserModel.findOne({ email: identifier });
      }
  
      if (!user) {
        return res
          .status(401)
          .json({ status: false, message: "Invalid identifier or password" });
      }
  
      const isValidPassword = await bcrypt.compare(
        login_password,
        user.login_password
      );
      if (!isValidPassword) {
        return res
          .status(401)
          .json({ status: false, message: "Invalid identifier or password" });
      }

      const token = jwt.sign({ role_id:user.role_id,role: user.role,code:user.user_id }, process.env.SECRET_TOKEN, { expiresIn: '3h' });
  
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await UserService.getAllUsers();
        const encryptedData = encryptData(users)
        res.status(200).json({
            status: true,
            message: "Users retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};
exports.getUserById = async (req, res, next) => {
    try {
        const { user_id } = req.query;
        const users = await UserService.findUserById(user_id);
        if (!users) {
            return res.status(404).json({ status: false, message: "User not found" });
        }
        const encryptedData = encryptData(users)
        res.status(200).json({
            status: true,
            message: "Users retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.forwardPassword = async(req, res, next) => {
  try {
      const { phone } = req.query;
      const { login_password } = req.body;

      const forgotPassword = await UserService.findUserByPhone(phone);
      if (!forgotPassword) {
          return res.status(404).json({ status: false, message: "User not found" });
      }
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(login_password, salt);

      forgotPassword.login_password = hashedPassword;

      await forgotPassword.save();

      return res.status(200).json({ status: true, message: "User password changed to successfully" });
  } catch (error) {
      next(error);
  }
}

exports.changePassword = async(req, res, next) => {
  try {
      const { phone } = req.query;
      const { old_password, login_password } = req.body;

      const changePassword = await UserService.findUserByPhone(phone);
      if (!changePassword) {
          return res.status(404).json({ status: false, message: "User not found" });
      }
       const oldPassword = changePassword.login_password;
       const isValidPassword = await bcrypt.compare(
        old_password,
        oldPassword
      );
      if (!isValidPassword) {
        return res
          .status(401)
          .json({ status: false, message: "Password mismatch" });
      }
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(login_password, salt);

      changePassword.login_password = hashedPassword;

      await changePassword.save();

      return res.status(200).json({ status: true, message: "Password changed to successfully" });
  } catch (error) {
      next(error);
  }
}

exports.updateUser = async (req, res, next) => {
  try {
    const { user_id } = req.query;
    const { user_name,dept_name,address,pincode,status,role_id,role } = req.body;

  
    const user = await UserService.findUserById(user_id);
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    const updatedUser = await UserService.updateUserById(user_id, {
      user_name,
      dept_name,
      address,
      pincode,
      status,
      role_id,
      role
    });

    return res.status(200).json({ status: true, message: "User Updated successfully" });
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
