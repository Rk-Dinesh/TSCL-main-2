const express = require('express');
const router = express.Router();
const grievanceEscalationController = require('../Controller/grievance_escalation_controller');
const verifyToken = require('../Authorization');


router.get('/get',verifyToken, grievanceEscalationController.getAllGrievanceEscalations);
router.get('/getbyid',verifyToken, grievanceEscalationController.getGrievanceEscalationById);
router.get('/getbydeptrole',verifyToken, grievanceEscalationController.getGrievanceEscalationRoleDept);

module.exports = router;
