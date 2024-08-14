const express = require('express');
const router = express.Router();
const multer = require("multer");
const newGrievanceAttachmentController = require('../Controller/new_grievance_attachment_controller');

const upload = multer({
    dest: "attachments/",
    limits: {
      fileSize: 50 * 1024 * 1024,
    },
  });

router.post('/post',upload.single("file"), newGrievanceAttachmentController.uploadFile);
router.get('/get', newGrievanceAttachmentController.getAllNewGrievanceAttachments);
router.get('/getbyid', newGrievanceAttachmentController.getNewGrievanceAttachmentById);

module.exports = router;
