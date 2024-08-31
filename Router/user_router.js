const express = require('express');
const router = express.Router();
const userController = require('../Controller/user_controller');
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


router.post('/post',verifyToken, userController.createUser);
router.post('/userforgotpassword',userController.forwardPassword);
router.post('/userchangepassword',verifyToken,userController.changePassword);
router.post('/login', userController.loginUser);
router.post('/loginweb', userController.loginUserweb);
router.get('/get',verifyToken, userController.getAllUsers);
router.get('/getbyid',verifyToken, userController.getUserById);
router.get('/getbydept',verifyToken, userController.getUserByDept);
router.delete('/delete',verifyToken, userController.deleteUserById);
router.post('/update',verifyToken, userController.updateUser);
router.post('/uploadcsv', upload.single('file'), userController.uploadCSV);
module.exports = router;
