const DesignationModel = require("../Models/designation");
const IdcodeServices = require("./idcode_Service");

exports.createDesignation = async (complaintData) => {
    const designation = new DesignationModel(complaintData);
    return await designation.save();
};

exports.getAllDesignation = async () => {
    return await DesignationModel.find();
};
exports.getActiveDesignation = async () => {
    return await DesignationModel.find({status:'active'});
};
exports.getDesignationById = async (desgination_id) => {
    return await DesignationModel.findOne({ desgination_id });
};

exports.updateDesignationById = async (desgination_id, updateData) => {
    return await DesignationModel.updateOne({ desgination_id }, { $set: updateData });
  };
  
exports.deleteDesignationById = async (desgination_id) => {
    return await DesignationModel.findOneAndDelete({ desgination_id });
};

exports.bulkInsert =  async(csvs,createdByUser) => {
    try {
        for (let csv of csvs) {
            csv.desgination_id = await IdcodeServices.generateCode("Designation");
            csv.status = 'active'; 
            csv.created_by_user = createdByUser;
        }
        return await DesignationModel.insertMany(csvs);
    } catch (error) {
        throw error;
    }
}