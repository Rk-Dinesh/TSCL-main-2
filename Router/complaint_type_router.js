const express = require('express');
const router = express.Router();
const complaintTypeController = require('../Controller/complaint_type_controller');
const verifyToken = require('../Authorization');

router.post('/post',verifyToken, complaintTypeController.createComplaintType);
router.get('/get',verifyToken, complaintTypeController.getAllComplaintsType);
router.get('/getactive',verifyToken, complaintTypeController.getActiveComplaintsType);
router.get('/getbyid',verifyToken, complaintTypeController.getComplaintsTypeById);
router.delete('/delete',verifyToken, complaintTypeController.deleteComplaintsTypeById);
router.post('/update',verifyToken, complaintTypeController.updateComplaintsType);
module.exports = router;
