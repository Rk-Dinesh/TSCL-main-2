const express = require('express');
const router = express.Router();
const grievanceStatusController = require('../Controller/grievance_status_controller');

router.post('/post', grievanceStatusController.createGrievanceStatus);
router.get('/get', grievanceStatusController.getAllGrievanceStatuses);

module.exports = router;
