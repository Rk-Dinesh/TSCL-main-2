const encryptData = require('../encryptedData');
const DesginationService = require('../Service/designation_service');
const IdcodeServices = require('../Service/idcode_Service');

exports.createDesignation = async (req, res, next) => {
    try {
        const { org_name,dept_name,designation,status, created_by_user } = req.body;
        const desgination_id = await IdcodeServices.generateCode("Designation");
        const Designation = await DesginationService.createDesignation({ desgination_id, org_name,dept_name,designation,status, created_by_user});
        
        res.status(200).json({
            status: true,
            message: "Designation created successfully"
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllDesignation = async (req, res, next) => {
    try {
        const Designation = await DesginationService.getAllDesignation();
        const encryptedData = encryptData(Designation)
        res.status(200).json({
            status: true,
            message: "Designation retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};
exports.getActiveDesignation = async (req, res, next) => {
    try {
        const Designation = await DesginationService.getActiveDesignation();
        const encryptedData = encryptData(Designation)
        res.status(200).json({
            status: true,
            message: "Designation retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.getDesignationById = async (req, res, next) => {
    try {
        const { desgination_id } = req.query;
        const Designation = await DesginationService.getDesignationById(desgination_id);
        if (!Designation) {
            return res.status(404).json({ status: false, message: "Designation not found" });
        }
        const encryptedData = encryptData(Designation)
        res.status(200).json({
            status: true,
            message: "Designation retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.updateDesignation = async (req, res, next) => {
    try {
      const { desgination_id } = req.query;
      const { org_name,dept_name,designation,status } = req.body;
  
    
      const Designation = await DesginationService.getDesignationById(desgination_id);
      if (!Designation) {
        return res.status(404).json({ status: false, message: "Designation not found" });
      }

      const updatedDesignation = await DesginationService.updateDesignationById(desgination_id, {
        org_name,dept_name,designation,status
      });
  
      return res.status(200).json({ status: true, message: "Designation Updated successfully" });
    } catch (error) {
      next(error);
    }
  };
  

exports.deleteDesignationById = async (req, res, next) => {
    try {
        const { desgination_id } = req.query;
        const result = await DesginationService.deleteDesignationById(desgination_id);
        if (!result) {
            return res.status(404).json({ status: false, message: "Designation not found" });
        }
        res.status(200).json({
            status: true,
            message: "Designation deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};