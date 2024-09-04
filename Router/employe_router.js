const express = require('express');
const router = express.Router();
const EmployeeController = require('../Controller/employee_controller');
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


router.post('/post',verifyToken, EmployeeController.createUser);
router.get('/get',verifyToken, EmployeeController.getAllUsers);
router.get('/getactive',verifyToken, EmployeeController.getActiveUsers);
router.get('/getbyid',verifyToken, EmployeeController.getUserById);
router.get('/getbyname',verifyToken, EmployeeController.getUserByName);
router.get('/getbydept',verifyToken, EmployeeController.getUserByDept);
router.delete('/delete',verifyToken, EmployeeController.deleteUserById);
router.post('/update',verifyToken, EmployeeController.updateUser);
router.post('/uploadcsv', upload.single('file'), EmployeeController.uploadCSV);
module.exports = router;
