const WardService = require('../Service/ward_Service');
const IdcodeServices = require('../Service/idcode_Service');
const encryptData = require('../encryptedData');
const csvParser = require('csv-parser');
const fs = require('fs');
const path = require('path');

exports.createWard = async (req, res, next) => {
    try {
        const { status, zone_id, zone_name, created_by_user,ward_name } = req.body;
        const ward_id = await IdcodeServices.generateCode("Ward");
        const ward = await WardService.createWard({ ward_id, status, zone_id, zone_name, created_by_user ,ward_name});
        
        res.status(200).json({
            status: true,
            message: "Ward created successfully"
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllWards = async (req, res, next) => {
    try {
        const wards = await WardService.getAllWards();
        const encryptedData = encryptData(wards)
        res.status(200).json({
            status: true,
            message: "Wards retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.getActiveWards = async (req, res, next) => {
    try {
        const wards = await WardService.getActiveWards();
        const encryptedData = encryptData(wards)
        res.status(200).json({
            status: true,
            message: "Wards retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.getWardByZoneName = async (req, res, next) => {
    try {
        const {  zone_name } = req.query;
        const ward = await WardService.getActiveWardsGuest( zone_name);
        if (!ward) {
            return res.status(404).json({ status: false, message: "Ward not found" });
        }
        const encryptedData = encryptData(ward)
        res.status(200).json({
            status: true,
            message: "Ward retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.getWardByZoneNameGuest = async (req, res, next) => {
    try {
        const {  zone_name } = req.query;
        const ward = await WardService.getActiveWardsGuest( zone_name);
        if (!ward) {
            return res.status(404).json({ status: false, message: "Ward not found" });
        }
        const encryptedData = encryptData(ward)
        res.status(200).json({
            status: true,
            message: "Ward retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.getWardById = async (req, res, next) => {
    try {
        const { zone_id, ward_id } = req.query;
        const ward = await WardService.getWardById(zone_id, ward_id);
        if (!ward) {
            return res.status(404).json({ status: false, message: "Ward not found" });
        }
        const encryptedData = encryptData(ward)
        res.status(200).json({
            status: true,
            message: "Ward retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.getWardId = async (req, res, next) => {
    try {
        const {  ward_id } = req.query;
        const ward = await WardService.getWardId( ward_id);
        if (!ward) {
            return res.status(404).json({ status: false, message: "Ward not found" });
        }
        const encryptedData = encryptData(ward)
        res.status(200).json({
            status: true,
            message: "Ward retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.updateWard = async (req, res, next) => {
    try {
      const { ward_id } = req.query;
      const { zone_id,zone_name,ward_name, status } = req.body;
  
    
      const ward = await WardService.getWardId(ward_id);
      if (!ward) {
        return res.status(404).json({ status: false, message: "Ward not found" });
      }
  
      const updatedWard = await WardService.updateWardById(ward_id, {
        zone_id,
        zone_name,
        ward_name,
        status,
      });
  
      return res.status(200).json({ status: true, message: "Ward Updated successfully" });
    } catch (error) {
      next(error);
    }
  };

exports.deleteWardById = async (req, res, next) => {
    try {
        const { ward_id } = req.query;
        const result = await WardService.deleteWardById(ward_id);
        if (!result) {
            return res.status(404).json({ status: false, message: "Ward not found" });
        }
        res.status(200).json({
            status: true,
            message: "Ward deleted successfully"
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
            const result = await WardService.bulkInsert(csvs);
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
