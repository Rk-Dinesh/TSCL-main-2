const DepartmentService = require('../Service/department_service');
const IdcodeServices = require('../Service/idcode_Service');

exports.createDepartment = async (req, res, next) => {
    try {
        const { dept_id, dept_name, org_name, status, created_by_user } = req.body;
        const department_id = await IdcodeServices.generateCode("Department");
        const department = await DepartmentService.createDepartment({ dept_id: department_id, dept_name, org_name, status, created_by_user });
        
        res.status(200).json({
            status: true,
            message: "Department created successfully",
            data: department
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllDepartments = async (req, res, next) => {
    try {
        const departments = await DepartmentService.getAllDepartments();
        res.status(200).json({
            status: true,
            message: "Departments retrieved successfully",
            data: departments
        });
    } catch (error) {
        next(error);
    }
};
exports.getDepartmentById = async (req, res, next) => {
    try {
        const { dept_id } = req.query;
        const department = await DepartmentService.getDepartmentById(dept_id);
        if (!department) {
            return res.status(404).json({ status: false, message: "Department not found" });
        }
        res.status(200).json({
            status: true,
            message: "Department retrieved successfully",
            data: department
        });
    } catch (error) {
        next(error);
    }
};exports.deleteDepartmentById = async (req, res, next) => {
    try {
        const { dept_id } = req.query;
        const result = await DepartmentService.deleteDepartmentById(dept_id);
        if (!result) {
            return res.status(404).json({ status: false, message: "Department not found" });
        }
        res.status(200).json({
            status: true,
            message: "Department deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

