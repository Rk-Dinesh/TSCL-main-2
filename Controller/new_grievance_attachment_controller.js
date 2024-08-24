const NewGrievanceAttachmentService = require('../Service/new_grievance_attachment_service');
const crypto = require("crypto");
const { gfs } = require('../Config/db');
const fs = require("fs");
const mongoose = require("mongoose");
const NewGrievanceAttachmentModel = require('../Models/new_grievance_attachment');
const archiver = require('archiver');
const encryptData = require('../encryptedData');



exports.uploadFile = async (req, res) => {
    try {
      const { file, body } = req;
      const { grievance_id,created_by_user } = body;
  
      const AttachmentModel = await NewGrievanceAttachmentService.attachment(
        file,
        grievance_id,
        created_by_user
      );
  
      res.status(200).send(`saved model ${AttachmentModel._id}`);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error saving model");
    }
  };

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

  

  exports.getfile_id = async (req, res) => {
    try {
      const id = req.query.grievance_id;
  
      if (!id) {
        return res.status(400).json({ error: "id query parameter is required" });
      }
  
      const { contentType, readStream } = await NewGrievanceAttachmentService.getfileById(id);
  
      res.set("Content-Type", contentType);
      readStream.pipe(res);
    } catch (err) {
      console.error(err);
      if (err.message === "Data not found") {
        res.status(404).json({ error: "Data not found" });
      } else {
        res.status(500).json({ error: "Server error" });
      }
    }
  };


  exports.getfileIdMul = async (req, res) => {
    try {
      const id = req.query.grievance_id;
  
      if (!id) {
        return res.status(400).json({ error: "grievance_id query parameter is required" });
      }
  
      const files = await NewGrievanceAttachmentService.getfileByIdMul(id);
  
      if (files.length === 0) {
        return res.status(404).json({ error: "No files found" });
      }
  
      // Set response headers to indicate multiple files
      res.set("Content-Type", "application/octet-stream");
      res.set("Content-Disposition", `attachment; filename="${id}.zip"`);

      // Create a zip stream to send multiple files
      const archiver = require('archiver');
      const archive = archiver('zip');
      archive.pipe(res);
  
      files.forEach(file => {
        const extension = file.contentType ? file.contentType.split('/')[1] : 'bin';
        const fileName = `${id}-${extension}`;
        
        if (file.readStream) {
          archive.append(file.readStream, { name: fileName });
        } else {
          console.error(`Read stream for file ${fileName} is undefined`);
        }
      });
  
      archive.finalize();
    } catch (err) {
      console.error(err);
      if (err.message === "Data not found") {
        res.status(404).json({ error: "Data not found" });
      } else {
        res.status(500).json({ error: "Server error" });
      }
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
  
  

  


