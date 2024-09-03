const express = require('express');
const router = express.Router();
const newGrievanceController = require('../Controller/new_grievance_controller');
const verifyToken = require('../Authorization');

router.post('/post',verifyToken, newGrievanceController.createNewGrievance);
router.get('/get',verifyToken, newGrievanceController.getAllNewGrievances);
router.get('/getbyid',verifyToken, newGrievanceController.getNewGrievanceById);
router.get('/getbyuserid',verifyToken, newGrievanceController.getGrievanceByUserId);
router.get('/getbyidstatus',verifyToken, newGrievanceController.getGrievanceByUstatusClosedID);
router.get('/getbyassign',verifyToken, newGrievanceController.getGrievanceByAssign);
router.get('/getbydept',verifyToken, newGrievanceController.getGrievanceByDept);
router.post('/updatestatus', newGrievanceController.updateStatus);
router.post('/updateassign',verifyToken, newGrievanceController.updateAssign);
router.delete('/delete',verifyToken, newGrievanceController.deleteNewGrievanceById);
router.get('/filter',verifyToken, newGrievanceController.filterGrievances);
module.exports = router;
