const express = require('express');
const router = express.Router();
const grievanceLogController = require('../Controller/grievance_log_controller');
const verifyToken = require('../Authorization');

router.post('/post',verifyToken, grievanceLogController.createGrievanceLog);
router.get('/get',verifyToken, grievanceLogController.getAllGrievanceLogs);
router.get('/getbyid',verifyToken, grievanceLogController.getGrievanceLogById);
module.exports = router;
