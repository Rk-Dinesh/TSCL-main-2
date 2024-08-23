const { gfs } = require('../Config/db');
const fs = require("fs");
const mongoose = require("mongoose");
const crypto = require("crypto");
const NewGrievanceAttachmentModel = require('../Models/new_grievance_attachment');



exports.attachment= async (file, grievance_id,created_by_user) => {
    try {
      if (file.size > 50 * 1024 * 1024) {
        throw new Error(
          "File is too large, please upload a file smaller than 50MB."
        );
      }

      const randomName = crypto.randomBytes(10).toString("hex");

      const writeStream = gfs.openUploadStream(randomName, {
        _id: new mongoose.Types.ObjectId(),
      });

      fs.createReadStream(file.path).pipe(writeStream);

      return new Promise((resolve, reject) => {
        writeStream.on("finish", async () => {
          const myModel = new NewGrievanceAttachmentModel({
            grievance_id,
            created_by_user,
            attachment_id: writeStream.id,
            attachment: randomName
          });

          await myModel.save();

          resolve(myModel);
        });

        writeStream.on("error", (err) => {
          reject(err);
        });
      });
    } catch (error) {
      throw error;
    }
  }

exports.getAllNewGrievanceAttachments = async () => {
    return await NewGrievanceAttachmentModel.find();
};
exports.getNewGrievanceAttachmentById = async (grievance_id) => {
    return await NewGrievanceAttachmentModel.findOne({ grievance_id });
};
