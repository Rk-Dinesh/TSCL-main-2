const encryptData = require('../encryptedData');
const IdcodeServices = require('../Service/idcode_Service');
const StatusService = require('../Service/status_service')

exports.createstatus = async (req, res, next) => {
    try {
        const { status_name,status,color, created_by_user} = req.body;   
        const status_id = await IdcodeServices.generateCode("Status");
        const newstatus = await StatusService.createstatus({ status_id, status_name,status,color, created_by_user});
        
        res.status(200).json({
            status: true,
            message: "Status created successfully"
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllstatus = async (req, res, next) => {
    try {
        const newstatus = await StatusService.getAllstatus();
        const encryptedData = encryptData(newstatus)
        res.status(200).json({
            status: true,
            message: "status retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.getActivestatus = async (req, res, next) => {
    try {
        const newstatus = await StatusService.getActivestatus();
        const encryptedData = encryptData(newstatus)
        res.status(200).json({
            status: true,
            message: "Active status retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};


exports.getstatusById = async (req, res, next) => {
    try {
        const { status_id } = req.query;
        const newstatus = await StatusService.getstatusById(status_id);
        if (!newstatus) {
            return res.status(404).json({ status: false, message: "status not found" });
        }
        const encryptedData = encryptData(newstatus)
        res.status(200).json({
            status: true,
            message: "status id retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.updatestatus = async (req, res, next) => {
    try {
      const { status_id } = req.query;
      const { status_name,status,color } = req.body;  
  
    
      const newstatus = await StatusService.getstatusById(status_id);
      if (!newstatus) {
        return res.status(404).json({ status: false, message: "status not found" });
      }

      const updatedstatus = await StatusService.updatestatusById(status_id, {
        status_name,status,color
      });
  
      return res.status(200).json({ status: true, message: "status Updated successfully" });
    } catch (error) {
      next(error);
    }
  };
  

exports.deletestatusById = async (req, res, next) => {
    try {
        const { status_id } = req.query;
        const result = await StatusService.deletestatusById(status_id);
        if (!result) {
            return res.status(404).json({ status: false, message: "status not found" });
        }
        res.status(200).json({
            status: true,
            message: "status deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};
