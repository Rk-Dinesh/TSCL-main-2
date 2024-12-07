const TemplateModel = require("../Models/Template");

exports.createTemplate = async (TemplateData) => {
    const Template = new TemplateModel(TemplateData);
    return await Template.save();
};

exports.getAllTemplate = async () => {
    return await TemplateModel.find();
};

exports.getTemplateById = async (temp_id) => {
    return await TemplateModel.findOne({ temp_id });
};

exports.updateTemplateById = async (temp_id, updateData) => {
    return await TemplateModel.updateOne({ temp_id }, { $set: updateData });
  };
  
exports.deleteTemplateById = async (temp_id) => {
    return await TemplateModel.findOneAndDelete({ temp_id });
};

exports.getTemplateByDeptAndComplaint = async (dept_name, complaint_type) => {
    return await TemplateModel.find({ dept_name, complaint_type });
};