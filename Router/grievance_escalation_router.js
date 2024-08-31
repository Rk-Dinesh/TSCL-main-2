const express = require('express');
const router = express.Router();
const grievanceEscalationController = require('../Controller/grievance_escalation_controller');


router.get('/get', grievanceEscalationController.getAllGrievanceEscalations);
router.get('/getbyid', grievanceEscalationController.getGrievanceEscalationById);
router.get('/getbydeptrole', grievanceEscalationController.getGrievanceEscalationRoleDept);

module.exports = router;
