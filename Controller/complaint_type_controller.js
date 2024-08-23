const encryptData = require('../encryptedData');
const ComplaintTypeService = require('../Service/complaint_type_service');
const IdcodeServices = require('../Service/idcode_Service');

exports.createComplaintType = async (req, res, next) => {
    try {
        const { complaint_type,status, created_by_user } = req.body;
        const compliant_type_id = await IdcodeServices.generateCode("ComplaintType");
        const complaint = await ComplaintTypeService.createComplaintType({ compliant_type_id, complaint_type,status, created_by_user});
        
        res.status(200).json({
            status: true,
            message: "ComplaintType created successfully"
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllComplaintsType = async (req, res, next) => {
    try {
        const complaints = await ComplaintTypeService.getAllComplaintsType();
        const encryptedData = encryptData(complaints)
        res.status(200).json({
            status: true,
            message: "ComplaintsType retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.getComplaintsTypeById = async (req, res, next) => {
    try {
        const { compliant_type_id } = req.query;
        const complianttype = await ComplaintTypeService.getComplaintsTypeById(compliant_type_id);
        if (!complianttype) {
            return res.status(404).json({ status: false, message: "CompliantType not found" });
        }
        const encryptedData = encryptData(complianttype)
        res.status(200).json({
            status: true,
            message: "CompliantType retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.updateComplaintsType = async (req, res, next) => {
    try {
      const { compliant_type_id } = req.query;
      const { complaint_type,status } = req.body;
  
    
      const complianttype = await ComplaintTypeService.getComplaintsTypeById(compliant_type_id);
      if (!complianttype) {
        return res.status(404).json({ status: false, message: "CompliantType not found" });
      }

      const updatedCompliantType = await ComplaintTypeService.updateComplaintsTypeById(compliant_type_id, {
        complaint_type,
        status
      });
  
      return res.status(200).json({ status: true, message: "CompliantType Updated successfully" });
    } catch (error) {
      next(error);
    }
  };
  

exports.deleteComplaintsTypeById = async (req, res, next) => {
    try {
        const { compliant_type_id } = req.query;
        const result = await ComplaintTypeService.deleteComplaintsTypeById(compliant_type_id);
        if (!result) {
            return res.status(404).json({ status: false, message: "CompliantType not found" });
        }
        res.status(200).json({
            status: true,
            message: "CompliantType deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};