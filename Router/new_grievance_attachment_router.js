const express = require('express');
const router = express.Router();
const multer = require("multer");
const newGrievanceAttachmentController = require('../Controller/new_grievance_attachment_controller');

const upload = multer({
  dest: "attachments/",
  limits: {
    fileSize: 50 * 1024 * 1024,
    files: 5, 
  },
});


router.post('/post', upload.array("files", 5), newGrievanceAttachmentController.uploadFiles);
router.get('/getbyid',newGrievanceAttachmentController.getfileIdMul);
router.get("/file/:filename", newGrievanceAttachmentController.getFile);
router.get('/getattachments',newGrievanceAttachmentController.getAttachments);

module.exports = router;
