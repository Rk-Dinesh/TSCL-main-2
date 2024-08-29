const express = require('express');
const router = express.Router();
const departmentController = require('../Controller/department_controller');
const verifyToken = require('../Authorization');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: 'excel',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage: storage });

router.post('/post',verifyToken, departmentController.createDepartment);
router.get('/get',verifyToken, departmentController.getAllDepartments);
router.get('/getactive',verifyToken, departmentController.getActiveDepartments);
router.get('/getbyid',verifyToken, departmentController.getDepartmentById);
router.delete('/delete',verifyToken, departmentController.deleteDepartmentById);
router.post('/update',verifyToken, departmentController.updateDepartment);
router.post('/uploadcsv', upload.single('file'), departmentController.uploadCSV);
module.exports = router;
