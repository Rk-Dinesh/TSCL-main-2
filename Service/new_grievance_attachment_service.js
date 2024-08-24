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
exports.getNewGrievanceAttachmentAll = async (grievance_id) => {
  return await NewGrievanceAttachmentModel.find({ grievance_id });
};
exports.getfileById = async (req,res) => {
  try {
    const data = await NewGrievanceAttachmentModel.find({ grievance_id });
    if (!data) {
      throw new Error("data not found");
    }

    if (data.attachment) {
      const file = await gfs.find({ filename: data.attachment }).toArray();
      if (!file || file.length === 0) {
        throw new Error("File not found");
      }

      const readStream = gfs.openDownloadStream(file[0]._id);
      return {
        contentType: file[0].contentType,
        readStream,
      };
    }

    return data;
  } catch (err) {
    throw err;
  }
}

exports.getfileByIdMul = async (grievance_id) => {
  try {
    const data = await NewGrievanceAttachmentModel.find({ grievance_id });
    if (!data || data.length === 0) {
      throw new Error("Data not found");
    }

    const files = [];
    for (const attachment of data) {
      if (attachment.attachment) {
        const file = await gfs.find({ filename: attachment.attachment }).toArray();
        if (!file || file.length === 0) {
          throw new Error(`File not found for attachment ${attachment.attachment}`);
        }
        files.push({
          contentType: file[0].contentType,
          readStream: gfs.openDownloadStream(file[0]._id),
        });
      }
    }

    return files;
  } catch (err) {
    throw err;
  }
};

exports.  getFile =async (filename) => {
  try {
    const file = await gfs.find({ filename }).toArray();
    if (!file || file.length === 0) {
      return null;
    }

    const readStream = gfs.openDownloadStream(file[0]._id);
    return {
      contentType: file[0].contentType,
      readStream,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}

