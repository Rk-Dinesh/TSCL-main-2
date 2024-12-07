const encryptData = require('../encryptedData');
const TemplateService = require('../Service/template_service');
const IdcodeServices = require('../Service/idcode_Service');

exports.createTemplate = async (req, res, next) => {
    try {
        const { dept_name,complaint_type, temp_title,desc,created_by_user} = req.body;
        const temp_id = await IdcodeServices.generateCode("Template");
        const template = await TemplateService.createTemplate({ temp_id, dept_name,complaint_type, temp_title,desc,created_by_user});
        
        res.status(200).json({
            status: true,
            message: "Template created successfully"
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllTemplate = async (req, res, next) => {
    try {
        const template = await TemplateService.getAllTemplate();
        const encryptedData = encryptData(template)
        res.status(200).json({
            status: true,
            message: "Template retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.getTemplateById = async (req, res, next) => {
    try {
        const { temp_id } = req.query;
        const template = await TemplateService.getTemplateById(temp_id);
        if (!template) {
            return res.status(404).json({ status: false, message: "template not found" });
        }
        const encryptedData = encryptData(template)
        res.status(200).json({
            status: true,
            message: "template retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.updateTemplate = async (req, res, next) => {
    try {
      const { temp_id } = req.query;
      const { dept_name,complaint_type,temp_title,desc } = req.body;
  
    
      const template = await TemplateService.getTemplateById(temp_id);
      if (!template) {
        return res.status(404).json({ status: false, message: "template not found" });
      }

      const updatedTemplate = await TemplateService.updateTemplateById(temp_id, {
        dept_name,complaint_type,temp_title,desc
      });
  
      return res.status(200).json({ status: true, message: "template Updated successfully" });
    } catch (error) {
      next(error);
    }
  };
  

exports.deleteTemplateById = async (req, res, next) => {
    try {
        const { temp_id } = req.query;
        const result = await TemplateService.deleteTemplateById(temp_id);
        if (!result) {
            return res.status(404).json({ status: false, message: "template not found" });
        }
        res.status(200).json({
            status: true,
            message: "template deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};