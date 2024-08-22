const PublicUserService = require("../Service/public_user_service");
const bcrypt = require("bcrypt");
const PublicUserModel = require("../Models/public_user");
const jwt = require("jsonwebtoken");
const encryptData = require("../encryptedData");


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

    res.status(200).json({
      status: true,
      message: "Public user created successfully",
     
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

