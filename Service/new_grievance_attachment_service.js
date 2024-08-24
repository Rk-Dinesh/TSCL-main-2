const { gfs } = require('../Config/db');
const fs = require("fs");
const mongoose = require("mongoose");
const crypto = require("crypto");
const NewGrievanceAttachmentModel = require('../Models/new_grievance_attachment');



exports.getNewGrievanceAttachmentById = async (grievance_id) => {
    return await NewGrievanceAttachmentModel.findOne({ grievance_id });
};
exports.getNewGrievanceAttachmentAll = async (grievance_id) => {
  return await NewGrievanceAttachmentModel.find({ grievance_id });
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

