const express = require('express');
const router = express.Router();
const grievanceWorksheetAttachmentController = require('../Controller/grievance_worksheet_attachment_controller');

router.post('/post', grievanceWorksheetAttachmentController.createGrievanceWorksheetAttachment);
router.get('/get', grievanceWorksheetAttachmentController.getAllGrievanceWorksheetAttachments);
router.get('/getbyid', grievanceWorksheetAttachmentController.getGrievanceWorksheetAttachmentById);
module.exports = router;
