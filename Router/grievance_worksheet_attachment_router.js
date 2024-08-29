const express = require('express');
const router = express.Router();
const multer = require("multer");
const grievanceWorksheetAttachmentController = require('../Controller/grievance_worksheet_attachment_controller');

const upload = multer({
    dest: "attachments/",
    limits: {
      fileSize: 50 * 1024 * 1024,
      files: 5, 
    },
  });
  
router.post('/post', upload.array("files", 5), grievanceWorksheetAttachmentController.uploadFiles);
router.get('/file/:filename', grievanceWorksheetAttachmentController.getFile);
router.get('/getattachments', grievanceWorksheetAttachmentController.getAttachments);
module.exports = router;
