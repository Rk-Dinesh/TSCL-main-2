const express = require('express');
const router = express.Router();
const organizationController = require('../Controller/organization_controller');
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

router.post('/post',verifyToken, organizationController.createOrganization);
router.get('/get',verifyToken, organizationController.getAllOrganizations);
router.get('/getactive',verifyToken, organizationController.getActiveOrganizations);
router.get('/getbyid',verifyToken, organizationController.getOrganizationById);
router.delete('/delete',verifyToken, organizationController.deleteOrganizationById);
router.post('/update',verifyToken, organizationController.updateOrganization);
router.post('/uploadcsv', upload.single('file'), organizationController.uploadCSV);
module.exports = router;
