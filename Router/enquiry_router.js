const express = require('express');
const router = express.Router();
const resourceController = require('../Controller/enquiry_controller');
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

router.post('/post',verifyToken, resourceController.createResource);
router.get('/get',verifyToken, resourceController.getAllResources);
router.get('/getactive',verifyToken, resourceController.getActiveResources);
router.get('/getbyid',verifyToken, resourceController.getResourceById);
router.delete('/delete',verifyToken, resourceController.deleteResourceById);
router.post('/update',verifyToken, resourceController.updateResource);
router.post('/uploadcsv', upload.single('file'), resourceController.uploadCSV);

module.exports = router;
