const { gfs1 } = require('../Config/db');
const GrievanceWorksheetAttachmentModel = require('../Models/grievance_worksheet_attachment');

exports.getGrievanceWorkshettAttachmentAttachmentById = async (grievance_id) => {
    return await GrievanceWorksheetAttachmentModel.findOne({ grievance_id });
};
exports.getGrievanceWorksheetAttachmentAll = async (grievance_id) => {
  return await GrievanceWorksheetAttachmentModel.find({ grievance_id });
};

exports.  getFile =async (filename) => {
  try {
    const file = await gfs1.find({ filename }).toArray();
    if (!file || file.length === 0) {
      return null;
    }

    const readStream = gfs1.openDownloadStream(file[0]._id);
    return {
      contentType: file[0].contentType,
      readStream,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}

