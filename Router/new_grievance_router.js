const express = require('express');
const router = express.Router();
const newGrievanceController = require('../Controller/new_grievance_controller');
const verifyToken = require('../Authorization');

router.post('/post',verifyToken, newGrievanceController.createNewGrievance);
router.put("/update-grievance",newGrievanceController.updateGrievance);
router.post('/postguest', newGrievanceController.createNewGrievancewhatsapp);
router.get('/getbyid',verifyToken, newGrievanceController.getNewGrievanceById);
router.get('/getbyidwhatsapp', newGrievanceController.getNewGrievanceByIdwhatsapp);
router.get('/getbyphone',verifyToken, newGrievanceController.getNewGrievanceByPhone);
router.get('/getbyphonewhatsapp', newGrievanceController.getNewGrievanceByPhonewhatsapp);
router.get('/getbyuseridfull',verifyToken, newGrievanceController.getGrievanceByUserIdfull);
router.get('/getbyuserid',verifyToken, newGrievanceController.getGrievanceByUserId);
router.get('/getbyidstatus',verifyToken, newGrievanceController.getGrievanceByUstatusClosedID);
router.get('/getbyassign',verifyToken, newGrievanceController.getGrievanceByAssign);
router.get('/getbydept',verifyToken, newGrievanceController.getGrievanceByDept);
router.get('/getbyoperator',verifyToken, newGrievanceController.getGrievanceByOperator);
router.post('/notify',verifyToken, newGrievanceController.updateEscalationNotify);
router.post('/notifyread',verifyToken, newGrievanceController.updateEscalationNotifyRead);
router.post('/worksheetJE',verifyToken, newGrievanceController.updateworksheetJE);
router.post('/reopen',verifyToken, newGrievanceController.ReopenTicket);
router.post('/highlight',verifyToken, newGrievanceController.Highlighted);
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
router.get('/departmentGrievanceCounts', newGrievanceController.departmentGrievanceCounts);
router.get('/departmentcomplaintGrievanceCounts', newGrievanceController.departmentcomplaintGrievanceCounts);
router.get('/zoneDepartmentGrievances', newGrievanceController.zoneDepartmentGrievances);
router.get('/wardDepartmentGrievances', newGrievanceController.wardDepartmentGrievances);
router.get('/employeeGrievances', newGrievanceController.departmentGrievanceCountsDetailed);
router.get('/complaintsByZoneAndPeriod', newGrievanceController.getComplaintSummaryByZone);

router.get('/get',verifyToken, newGrievanceController.getAllNewGrievances);
router.get('/bynotclosed',verifyToken, newGrievanceController.getGrievanceBynotClosed);
router.get('/byclosed',verifyToken, newGrievanceController.getGrievanceByClosed);
router.get('/byhigh',verifyToken, newGrievanceController.getGrievanceBySeverityHigh);
router.get('/bymedium',verifyToken, newGrievanceController.getGrievanceBySeverityMedium);
router.get('/bylow',verifyToken, newGrievanceController.getGrievanceBySeverityLow);
router.get('/byreopen',verifyToken, newGrievanceController.getGrievanceByReopen);
router.get('/byisreopen',verifyToken, newGrievanceController.getGrievanceByISReopen);

router.get('/getbydeptnotclosed',verifyToken, newGrievanceController.getGrievanceByDeptnotClosed);
router.get('/getbydeptclosed',verifyToken, newGrievanceController.getGrievanceByDeptClosed);

router.get('/getbyassignnotclosed',verifyToken, newGrievanceController.getGrievanceByAssignnotClosed);
router.get('/getbyassignclosed',verifyToken, newGrievanceController.getGrievanceByAssignClosed);




module.exports = router;



