const DepartmentModel = require('../Models/department');
const IdcodeServices = require('./idcode_Service');

exports.createDepartment = async (departmentData) => {
    const department = new DepartmentModel(departmentData);
    return await department.save();
};

exports.getAllDepartments = async () => {
    return await DepartmentModel.find();
};
exports.getActiveDepartments = async () => {
    return await DepartmentModel.find({status:'active'});
};
exports.getDepartmentById = async (dept_id) => {
    return await DepartmentModel.findOne({ dept_id });
};
exports.updateDepartmentById = async (dept_id, updateData) => {
    return await DepartmentModel.updateOne({ dept_id }, { $set: updateData });
  };
exports.deleteDepartmentById = async (dept_id) => {
    return await DepartmentModel.findOneAndDelete({ dept_id });
};
exports.bulkInsert =  async(csvs) => {
    try {
        for (let csv of csvs) {
            csv.dept_id = await IdcodeServices.generateCode('Department');
        }
        return await DepartmentModel.insertMany(csvs);
    } catch (error) {
        throw error;
    }
}

