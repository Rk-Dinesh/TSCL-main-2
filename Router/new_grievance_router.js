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
router.post('/tickettransfer',verifyToken, newGrievanceController.updateTransfer);
router.delete('/delete',verifyToken, newGrievanceController.deleteNewGrievanceById);
router.post('/updatemanyassign', newGrievanceController.UpdateManyAssign);
router.post('/updatemanytransfer', newGrievanceController.UpdateManyTransfer);
router.get('/filter',verifyToken, newGrievanceController.filterGrievances);

router.get('/ward-grievance-counts', newGrievanceController.wardGrievanceCounts);
router.get('/frequent-complainants-by-wardall', newGrievanceController.frequentComplainantsByWardAll);
router.get('/frequent-complainants-by-ward', newGrievanceController.frequentComplainantsByWard);
router.get('/top-grievances-by-public-name', newGrievanceController.topGrievancesByPublicName);
router.get('/grievancecounts', newGrievanceController.getGrievanceCounts);
router.get('/prioritycounts', newGrievanceController.PriorityCounts);
router.get('/locationZone', newGrievanceController.TopGrievancesByLocation);
router.get('/complaintcount', newGrievanceController.TopGrievancescomplaint);
router.get('/engineerload', newGrievanceController.EngineerWorkload);
router.get('/averageresolution', newGrievanceController.AverageResolutionTimeByEngineerByDepartment);
router.get('/beforeescalation', newGrievanceController.PercentageOfGrievancesResolvedWithinSpecifiedPeriodByDepartmentAndComplaintType);
router.get('/afterescalation', newGrievanceController.PercentageOfGrievancesEscalatedToHigherAuthorities);
router.get('/compartiveanalysis', newGrievanceController.ComparativeAnalysis);

module.exports = router;



