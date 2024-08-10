const express = require('express');
const router = express.Router();
const departmentController = require('../Controller/department_controller');

router.post('/post', departmentController.createDepartment);
router.get('/get', departmentController.getAllDepartments);
router.get('/getbyid', departmentController.getDepartmentById);
router.delete('/delete', departmentController.deleteDepartmentById);
module.exports = router;
