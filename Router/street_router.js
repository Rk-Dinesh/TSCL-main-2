const express = require('express');
const router = express.Router();
const streetController = require('../Controller/street_controller');
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

router.post('/post',verifyToken, streetController.createStreet);
router.get('/get',verifyToken, streetController.getAllStreets);
router.get('/getactive',verifyToken, streetController.getActiveStreets);
router.get('/getward',verifyToken, streetController.getWardByWardName);
router.get('/getwardguest', streetController.getWardByWardNameGuest);
router.get('/getbyid/:ward_id/:street_id',verifyToken, streetController.getStreetById);
router.get('/getbyid',verifyToken, streetController.getStreetId);
router.delete('/delete',verifyToken, streetController.deleteStreetById);
router.post('/update', streetController.updateStreet);
router.post('/uploadcsv', upload.single('file'), streetController.uploadCSV);
module.exports = router;
