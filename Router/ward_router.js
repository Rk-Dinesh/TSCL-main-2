const express = require('express');
const router = express.Router();
const wardController = require('../Controller/ward_Controller');
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

router.post('/post',verifyToken, wardController.createWard);
router.get('/get',verifyToken, wardController.getAllWards);
router.get('/getactive',verifyToken, wardController.getActiveWards);
router.get('/getbyid/:zone_id/:ward_id',verifyToken, wardController.getWardById);
router.get('/getbyid',verifyToken, wardController.getWardId);
router.delete('/delete',verifyToken, wardController.deleteWardById);
router.post('/update',verifyToken, wardController.updateWard);
router.post('/uploadcsv', upload.single('file'), wardController.uploadCSV);
module.exports = router;