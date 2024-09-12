const express = require('express');
const router = express.Router();
const complaintController = require('../Controller/complaint_controller');
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

router.post('/post',verifyToken, complaintController.createComplaint);
router.get('/get',verifyToken, complaintController.getAllComplaints);
router.get('/getactive',verifyToken, complaintController.getActiveComplaints);
router.get('/getactiveguest', complaintController.getActiveComplaintsGuest);
router.get('/getbyid',verifyToken,complaintController.getComplaintById)
router.delete('/delete',verifyToken,complaintController.deleteComplaintById)
router.post('/update',verifyToken, complaintController.updateComplaints);
router.post('/uploadcsv', upload.single('file'), complaintController.uploadCSV);
module.exports = router;
