const express = require('express');
const router = express.Router();
const newGrievanceController = require('../Controller/new_grievance_controller');

router.post('/post', newGrievanceController.createNewGrievance);
router.get('/get', newGrievanceController.getAllNewGrievances);
router.get('/getbyid', newGrievanceController.getNewGrievanceById);
router.delete('/delete', newGrievanceController.deleteNewGrievanceById);
module.exports = router;
