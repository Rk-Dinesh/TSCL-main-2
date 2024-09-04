const encryptData = require("../encryptedData");
const EmployeeService = require("../Service/employee_service");
const csvParser = require("csv-parser");
const fs = require("fs");
const path = require("path");

exports.createUser = async (req, res, next) => {
  try {
    const {
       
        emp_name,
        dept_name,
        phone,
        email,
        dob,
        address,
        pincode,
        designation_id,
        designation,
        status,
        created_by_user
    } = req.body;

    const existingUser = await EmployeeService.findUserByPhone(phone);
    if (existingUser) {
      return res.status(200).json({
        status: true,
        message: "Employee with this phone number already exists",
      });
    }

    const existingUser1 = await EmployeeService.findUserByEmail(email);
    if (existingUser1) {
      return res.status(200).json({
        status: true,
        message: "Employee with this Email already exists",
      });
    }

    const Employee = await EmployeeService.createUser(
        emp_name,
        dept_name,
        phone,
        email,
        dob,
        address,
        pincode,
        designation_id,
        designation,
        status,
        created_by_user
    );

    res.status(200).json({
      status: true,
      message: "Employee created successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await EmployeeService.getAllUsers();
    const encryptedData = encryptData(users);
    res.status(200).json({
      status: true,
      message: "Employee retrieved successfully",
      data: encryptedData,
    });
  } catch (error) {
    next(error);
  }
};

exports.getActiveUsers = async (req, res, next) => {
    try {
        const users = await EmployeeService.findUserByActive();
        const encryptedData = encryptData(users)
        res.status(200).json({
            status: true,
            message: "Employee retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.getUserByName = async (req, res, next) => {
    try {
      const { emp_name } = req.query;
      const users = await EmployeeService.findUserName(emp_name);
      if (!users) {
        return res.status(404).json({ status: false, message: "Employee not found" });
      }
      const encryptedData = encryptData(users);
      res.status(200).json({
        status: true,
        message: "Employee retrieved successfully",
        data: encryptedData,
      });
    } catch (error) {
      next(error);
    }
  };
exports.getUserById = async (req, res, next) => {
  try {
    const { emp_id } = req.query;
    const users = await EmployeeService.findUserById(emp_id);
    if (!users) {
      return res.status(404).json({ status: false, message: "Employee not found" });
    }
    const encryptedData = encryptData(users);
    res.status(200).json({
      status: true,
      message: "Employee retrieved successfully",
      data: encryptedData,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserByDept = async (req, res, next) => {
  try {
    const { dept_name } = req.query;
    const users = await EmployeeService.findUserByDept(dept_name);
    if (!users) {
      return res.status(404).json({ status: false, message: "Employee not found" });
    }
    const encryptedData = encryptData(users);
    res.status(200).json({
      status: true,
      message: "Employee retrieved successfully",
      data: encryptedData,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { emp_id } = req.query;
    const { emp_name, dept_name, address, pincode,dob,designation, status, } =
      req.body;

    const user = await EmployeeService.findUserById(emp_id);
    if (!user) {
      return res.status(404).json({ status: false, message: "Employee not found" });
    }

    const updatedUser = await EmployeeService.updateUserById(emp_id, {
        emp_name, dept_name, address, pincode,dob,designation, status
    });

    return res
      .status(200)
      .json({ status: true, message: "Employee Updated successfully" });
  } catch (error) {
    next(error);
  }
};

exports.deleteUserById = async (req, res, next) => {
  try {
    const { emp_id } = req.query;
    const result = await EmployeeService.deleteUserById(emp_id);
    if (!result) {
      return res.status(404).json({ status: false, message: "Employee not found" });
    }
    res.status(200).json({
      status: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
exports.uploadCSV = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const csvs = [];
    const filePath = path.join(__dirname, "../excel", req.file.filename);
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row) => {
        csvs.push(row);
      })
      .on("end", async () => {
        try {
          const result = await EmployeeService.bulkInsert(csvs);
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
