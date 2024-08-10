const express = require('express');
const router = express.Router();
const complaintController = require('../Controller/complaint_controller');

router.post('/post', complaintController.createComplaint);
router.get('/get', complaintController.getAllComplaints);
router.get('/getbyid',complaintController.getComplaintById)
router.delete('/delete',complaintController.deleteComplaintById)
module.exports = router;
