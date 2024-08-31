const PublicUserService = require("../Service/public_user_service");
const bcrypt = require("bcrypt");
const PublicUserModel = require("../Models/public_user");
const jwt = require("jsonwebtoken");
const encryptData = require("../encryptedData");
const csvParser = require('csv-parser');
const fs = require('fs');
const path = require('path');


exports.createPublicUser = async (req, res, next) => {
  try {
    const {
      public_user_name,
      phone,
      email,
      address,
      pincode,
      login_password,
      verification_status,
      user_status,
      role
    } = req.body;

    const existingUser = await PublicUserService.findPublicUserByPhone(phone);
    if (existingUser) {
     
      if (address && existingUser.address !== address) {
        existingUser.address = address;
      }
      if (pincode && existingUser.pincode !== pincode) {
        existingUser.pincode = pincode;
      }
      await existingUser.save(); 

      return res.status(200).json({
        status: true,
        message:
          "User with this phone number already exists, updated successfully"
      });
    }

    const existingUser1 = await PublicUserService.findPublicUserByEmail(email);
    if (existingUser1) {
      return res.status(200).json({
        status: true,
        message: "User with this Email already exists",
      });
    }

    const publicUser = await PublicUserService.createPublicUser(
      public_user_name,
      phone,
      email,
      address,
      pincode,
      login_password,
      verification_status,
      user_status,
      role
    );

    const encryptedData =encryptData( publicUser.public_user_id);

    res.status(200).json({
      status: true,
      message: "Public user created successfully",
      data:encryptedData
     
    });
  } catch (error) {
    next(error);
  }
};

exports.loginPublicUser = async (req, res, next) => {
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
      user = await PublicUserModel.findOne({ phone: identifier });
    } else {
      user = await PublicUserModel.findOne({ email: identifier });
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

    res.status(200).json({
      status: true,
      message: "Public user logged in successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.loginPublicUserweb = async (req, res, next) => {
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
        user = await PublicUserModel.findOne({ phone: identifier });
      } else {
        user = await PublicUserModel.findOne({ email: identifier });
      }
  
      if (!user) {
        return res
          .status(400)
          .json({ status: false, message: "Invalid identifier or password" });
      }
  
      const isValidPassword = await bcrypt.compare(
        login_password,
        user.login_password
      );
      if (!isValidPassword) {
        return res
          .status(400)
          .json({ status: false, message: "Invalid identifier or password" });
      }

      const token = jwt.sign({ role: user.role,code:user.public_user_id }, process.env.SECRET_TOKEN, { expiresIn: '3h' });
  
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };

exports.getAllPublicUsers = async (req, res, next) => {
  try {
    const publicUsers = await PublicUserService.getAllPublicUsers();
    const encryptedData = encryptData(publicUsers)
    res.status(200).json({
      status: true,
      message: "Public users retrieved successfully",
      data: encryptedData,
    });
  } catch (error) {
    next(error);
  }
};

exports.getPublicUserById = async (req, res, next) => {
  try {
    const { public_user_id } = req.query;
    const publicUser = await PublicUserService.getPublicUserById(
      public_user_id
    );
    if (!publicUser) {
      return res
        .status(404)
        .json({ status: false, message: "Public user not found" });
    }
    const encryptedData = encryptData(publicUser)
    res.status(200).json({
      status: true,
      message: "Public user retrieved successfully",
      data: encryptedData,
    });
  } catch (error) {
    next(error);
  }
};

exports.getPublicUserPhone = async (req, res, next) => {
  try {
    const { phone } = req.query;
    const publicUser = await PublicUserService.findPublicUserByPhone(
      phone
    );
    if (!publicUser) {
      return res
        .status(404)
        .json({ status: false, message: "Phone not found" });
    }
    const encryptedData = encryptData(publicUser)
    res.status(200).json({
      status: true,
      message: "Profile retrieved successfully",
      data: encryptedData,
    });
  } catch (error) {
    next(error);
  }
};

exports.forwardPassword = async(req, res, next) => {
  try {
      const { phone } = req.query;
      const { login_password } = req.body;

      const forgotPassword = await PublicUserService.findPublicUserByPhone(phone);
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

      const changePassword = await PublicUserService.findPublicUserByPhone(phone);
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

exports.updatePublicUser = async (req, res, next) => {
  try {
    const { public_user_id } = req.query;
    const { public_user_name,address,pincode,verification_status, user_status,role } = req.body;

  
    const publicuser = await PublicUserService.getPublicUserById(public_user_id);
    if (!publicuser) {
      return res.status(404).json({ status: false, message: "PublicUser not found" });
    }

    const updatedPublicUser = await PublicUserService.updatePublicUserById(public_user_id, {
      public_user_name,address,pincode,verification_status, user_status,role
    });

    return res.status(200).json({ status: true, message: "PublicUser Updated successfully" });
  } catch (error) {
    next(error);
  }
};

exports.deletePublicUserById = async (req, res, next) => {
  try {
    const { public_user_id } = req.query;
    const result = await PublicUserService.deletePublicUserById(public_user_id);
    if (!result) {
      return res
        .status(404)
        .json({ status: false, message: "Public user not found" });
    }
    res.status(200).json({
      status: true,
      message: "Public user deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.uploadCSV = async (req, res, next) => {
  try {
   
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const csvs = [];
    const filePath = path.join(__dirname, '../excel', req.file.filename);
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        csvs.push(row);
      })
      .on('end', async () => {
        try {
          const result = await PublicUserService.bulkInsert(csvs);
          res.status(200).json(result);
        } catch (error) {
          next(error);
        } finally {
          // Remove the file after processing
          fs.unlinkSync(filePath);
        }
      });
  } catch (error) {
    next(error);
  }
};