const express = require('express');
const router = express.Router();
const zoneController = require('../Controller/zone_Controller');
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

router.post('/post',verifyToken, zoneController.createZone);
router.get('/get',verifyToken, zoneController.getAllZones);
router.get('/getactive',verifyToken, zoneController.getActiveZones);
router.get('/getbyid',verifyToken, zoneController.getZoneById);
router.delete('/delete',verifyToken, zoneController.deleteZoneById);
router.post('/update',verifyToken, zoneController.updateZone);
router.post('/uploadcsv', upload.single('file'), zoneController.uploadCSV);
module.exports = router;
