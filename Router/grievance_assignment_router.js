const express = require('express');
const router = express.Router();
const grievanceAssignmentController = require('../Controller/grievance_assignment_controller');

router.post('/post', grievanceAssignmentController.createGrievanceAssignment);
router.get('/get', grievanceAssignmentController.getAllGrievanceAssignments);
router.get('/getbyid', grievanceAssignmentController.getGrievanceAssignmentById);

module.exports = router;
