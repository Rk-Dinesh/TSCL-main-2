const express = require('express');
const router = express.Router();
const desginationController = require('../Controller/designation_controller');
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

router.post('/post',verifyToken, desginationController.createDesignation);
router.get('/get',verifyToken, desginationController.getAllDesignation);
router.get('/getactive',verifyToken, desginationController.getActiveDesignation);
router.get('/getbyid',verifyToken, desginationController.getDesignationById);
router.delete('/delete',verifyToken, desginationController.deleteDesignationById);
router.post('/update',verifyToken, desginationController.updateDesignation);
router.post('/uploadcsv', upload.single('file'), desginationController.uploadCSV);
module.exports = router;
