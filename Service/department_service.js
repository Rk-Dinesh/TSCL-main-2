const DepartmentModel = require('../Models/department');

exports.createDepartment = async (departmentData) => {
    const department = new DepartmentModel(departmentData);
    return await department.save();
};

exports.getAllDepartments = async () => {
    return await DepartmentModel.find();
};
exports.getDepartmentById = async (dept_id) => {
    return await DepartmentModel.findOne({ dept_id });
};
exports.deleteDepartmentById = async (dept_id) => {
    return await DepartmentModel.findOneAndDelete({ dept_id });
};

