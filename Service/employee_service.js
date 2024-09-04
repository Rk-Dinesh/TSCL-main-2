const EmployeeModel = require('../Models/employee_Model');
const IdcodeServices = require('./idcode_Service');

exports.createUser = async (emp_name, dept_name, phone, email,dob, address, pincode,designation_id,designation,  status,created_by_user) => {
    try {
        
        var emp_id = await IdcodeServices.generateCode("Employee");

        const employee = new EmployeeModel({
            emp_id,
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
            created_by_user,
            
        });

        return await employee.save();
    } catch (err) {
        throw err;
    }
};

exports.findUserByPhone = async (phone) => {
    return await EmployeeModel.findOne({ phone });
};

exports.findUserByEmail = async (email) => {
    return await EmployeeModel.findOne({ email });
};

exports.findUserById = async (emp_id) => {
    return await EmployeeModel.findOne({ emp_id });
};

exports.findUserByActive = async () => {
    return await EmployeeModel.find({ status:"active" });
};

exports.findUserName = async (emp_name) => {
    return await EmployeeModel.findOne({ emp_name });
};
exports.findUserByDept = async (dept_name) => {
    return await EmployeeModel.find({ dept_name });
};
exports.getAllUsers = async () => {
    return await EmployeeModel.find();
};
exports.updateUserById = async (emp_id, updateData) => {
    return await EmployeeModel.updateOne({ emp_id }, { $set: updateData });
  };
exports.deleteUserById = async (emp_id) => {
    return await EmployeeModel.findOneAndDelete({ emp_id });
};


