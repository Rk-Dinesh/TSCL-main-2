const express = require('express');
const router = express.Router();
const newGrievanceAttachmentController = require('../Controller/new_grievance_attachment_controller');

router.post('/post', newGrievanceAttachmentController.createNewGrievanceAttachment);
router.get('/get', newGrievanceAttachmentController.getAllNewGrievanceAttachments);
router.get('/getbyid', newGrievanceAttachmentController.getNewGrievanceAttachmentById);

module.exports = router;
