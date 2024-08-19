const express = require('express');
const router = express.Router();
const newGrievanceController = require('../Controller/new_grievance_controller');
const verifyToken = require('../Authorization');

router.post('/post',verifyToken, newGrievanceController.createNewGrievance);
router.get('/get',verifyToken, newGrievanceController.getAllNewGrievances);
router.get('/getbyid',verifyToken, newGrievanceController.getNewGrievanceById);
router.get('/getbyuserid',verifyToken, newGrievanceController.getGrievanceByUserId);
router.delete('/delete',verifyToken, newGrievanceController.deleteNewGrievanceById);
module.exports = router;
