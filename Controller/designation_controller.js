const encryptData = require('../encryptedData');
const DesginationService = require('../Service/designation_service');
const IdcodeServices = require('../Service/idcode_Service');
const csvParser = require("csv-parser");
const fs = require("fs");
const path = require("path");

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

exports.uploadCSV = async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const createdByUser = req.body.created_by_user; 
      if (!createdByUser) {
          return res.status(400).json({ error: 'created_by_user is required' });
      }
  
      const csvs = [];
      const filePath = path.join(__dirname, "../excel", req.file.filename);
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on("data", (row) => {
          csvs.push(row);
        })
        .on("end", async () => {
          try {
            const result = await DesginationService.bulkInsert(csvs, createdByUser);
            res.status(200).json(result);
          } catch (error) {
            next(error);
          } finally {
            // Remove the file after processing
            fs.unlinkSync(filePath);
          }
        });
    } catch (error) {
      next(error);
    }
  };