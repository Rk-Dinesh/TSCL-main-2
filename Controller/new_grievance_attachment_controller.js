const NewGrievanceAttachmentService = require('../Service/new_grievance_attachment_service');
const crypto = require("crypto");
const { gfs } = require('../Config/db');
const fs = require("fs");
const mongoose = require("mongoose");
const NewGrievanceAttachmentModel = require('../Models/new_grievance_attachment');
const archiver = require('archiver');
const encryptData = require('../encryptedData');





  exports.uploadFiles = async (req, res) => {
    try {
      const files = req.files;
      const grievance_id = req.body.grievance_id;
      const created_by_user = req.body.created_by_user;
  
      if (files.length > 5) {
        return res.status(400).json({ message: "File count exceeds the limit of 5" });
      }
  
      const attachments = [];
  
      for (const file of files) {
        const randomName = crypto.randomBytes(10).toString("hex");
        const writeStream = gfs.openUploadStream(randomName, {
          _id: new mongoose.Types.ObjectId(),
        });
  
        fs.createReadStream(file.path).pipe(writeStream);
  
        const attachment = new NewGrievanceAttachmentModel({
          grievance_id,
          created_by_user,
          attachment_id: writeStream.id,
          attachment: randomName,
        });
  
        await attachment.save();
        attachments.push(attachment);
      }
  
      for (const file of files) {
        fs.unlinkSync(file.path);
      }
  
      res.status(200).json(attachments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to upload files" });
    }
  };

  exports.getFile = async (req, res) => {
    const { filename } = req.params;
    const file = await NewGrievanceAttachmentService.getFile(filename);
  
    if (!file) {
      return res.status(404).send("File not found");
    }
  
    res.set("Content-Type", file.contentType);
    file.readStream.pipe(res);
  };

  exports.getAttachments = async (req, res, next) => {
    try {
        const { grievance_id } = req.query;
        const grievance = await NewGrievanceAttachmentService.getNewGrievanceAttachmentAll(grievance_id);
        if (!grievance) {
            return res.status(404).json({ status: false, message: "grievance not found" });
        }
        const encryptedData = encryptData(grievance)
        res.status(200).json({
            status: true,
            message: "grievance retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};
  
  

  


