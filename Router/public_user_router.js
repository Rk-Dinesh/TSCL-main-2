const express = require('express');
const router = express.Router();
const publicUserController = require('../Controller/public_user_controller');
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

router.post('/post', publicUserController.createPublicUser);
router.post('/login', publicUserController.loginPublicUser);
router.post('/loginweb', publicUserController.loginPublicUserweb);
router.get('/get',verifyToken, publicUserController.getAllPublicUsers);
router.get('/getbyid',verifyToken, publicUserController.getPublicUserById);
router.get('/getbyphone',verifyToken, publicUserController.getPublicUserPhone);
router.post('/forgotpassword',publicUserController.forwardPassword);
router.post('/changePassword',verifyToken,publicUserController.changePassword);
router.delete('/delete',verifyToken, publicUserController.deletePublicUserById);
router.post('/update',verifyToken, publicUserController.updatePublicUser);
router.post('/uploadcsv', upload.single('file'), publicUserController.uploadCSV);
module.exports = router;
