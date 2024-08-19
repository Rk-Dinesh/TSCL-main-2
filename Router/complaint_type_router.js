const express = require('express');
const router = express.Router();
const complaintTypeController = require('../Controller/complaint_type_controller');
const verifyToken = require('../Authorization');

router.post('/post',verifyToken, complaintTypeController.createComplaintType);
router.get('/get',verifyToken, complaintTypeController.getAllComplaintsType);
module.exports = router;
