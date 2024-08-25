const express = require('express');
const router = express.Router();
const complaintController = require('../Controller/complaint_controller');
const verifyToken = require('../Authorization');

router.post('/post',verifyToken, complaintController.createComplaint);
router.get('/get',verifyToken, complaintController.getAllComplaints);
router.get('/getactive',verifyToken, complaintController.getAllComplaints);
router.get('/getbyid',verifyToken,complaintController.getComplaintById)
router.delete('/delete',verifyToken,complaintController.deleteComplaintById)
router.post('/update',verifyToken, complaintController.updateComplaints);
module.exports = router;
