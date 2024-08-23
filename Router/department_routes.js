const express = require('express');
const router = express.Router();
const departmentController = require('../Controller/department_controller');
const verifyToken = require('../Authorization');

router.post('/post',verifyToken, departmentController.createDepartment);
router.get('/get',verifyToken, departmentController.getAllDepartments);
router.get('/getbyid',verifyToken, departmentController.getDepartmentById);
router.delete('/delete',verifyToken, departmentController.deleteDepartmentById);
router.post('/update', departmentController.updateDepartment);
module.exports = router;
