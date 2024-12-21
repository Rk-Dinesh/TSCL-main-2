const ResourceService = require('../Service/enquiry_service');
const IdcodeServices = require('../Service/idcode_Service');
const encryptData = require('../encryptedData');
const csvParser = require('csv-parser');
const fs = require('fs');
const path = require('path');


exports.createResource = async (req, res, next) => {
    try {
        const {  res_name, image,status, created_by_user } = req.body;
        const Resource_id = await IdcodeServices.generateCode("Resource");
        const Resource = await ResourceService.createResource({ res_id: Resource_id, res_name,image, status, created_by_user });
        
        res.status(200).json({
            status: true,
            message: "Resource created successfully"
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllResources = async (req, res, next) => {
    try {
        const Resources = await ResourceService.getAllResources();
        const encryptedData = encryptData(Resources)
        res.status(200).json({
            status: true,
            message: "Resources retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.getActiveResources = async (req, res, next) => {
    try {
        const Resources = await ResourceService.getActiveResources();
        const encryptedData = encryptData(Resources)
        res.status(200).json({
            status: true,
            message: "Active Resources retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.getResourceById = async (req, res, next) => {
    try {
        const { res_id } = req.query;
        const Resource = await ResourceService.getResourceById(res_id);
        if (!Resource) {
            return res.status(404).json({ status: false, message: "Resource not found" });
        }
        const encryptedData = encryptData(Resource)
        res.status(200).json({
            status: true,
            message: "Resource retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.updateResource = async (req, res, next) => {
    try {
      const { res_id } = req.query;
      const { res_name,image, status } = req.body;
  
    
      const Resource = await ResourceService.getResourceById(res_id);
      if (!Resource) {
        return res.status(404).json({ status: false, message: "Resource not found" });
      }

      const updatedResource = await ResourceService.updateResourceById(res_id, {
        res_name,
        image,
        status,
      });
  
      return res.status(200).json({ status: true, message: "Resource Updated successfully" });
    } catch (error) {
      next(error);
    }
  };
  

exports.deleteResourceById = async (req, res, next) => {
    try {
        const { res_id } = req.query;
        const result = await ResourceService.deleteResourceById(res_id);
        if (!result) {
            return res.status(404).json({ status: false, message: "Resource not found" });
        }
        res.status(200).json({
            status: true,
            message: "Resource deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

exports.uploadCSV = async (req, res, next) => {
    try {
     
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      const csvs = [];
      const filePath = path.join(__dirname, '../excel', req.file.filename);
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => {
          csvs.push(row);
        })
        .on('end', async () => {
          try {
            const result = await ResourceService.bulkInsert(csvs);
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
  
