const StreetService = require('../Service/street_Service');
const IdcodeServices = require('../Service/idcode_Service');
const encryptData = require('../encryptedData');
const csvParser = require('csv-parser');
const fs = require('fs');
const path = require('path');

exports.createStreet = async (req, res, next) => {
    try {
        const { street_name, ward_id,status, created_by_user,ward_name,zone_id,zone_name } = req.body;
        const street_id = await IdcodeServices.generateCode("Street");
        const street = await StreetService.createStreet({ street_id, street_name, ward_id, status, created_by_user,ward_name,zone_id,zone_name });
        
        res.status(200).json({
            status: true,
            message: "Street created successfully",
            
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllStreets = async (req, res, next) => {
    try {
        const streets = await StreetService.getAllStreets();
        const encryptedData = encryptData(streets)
        res.status(200).json({
            status: true,
            message: "Streets retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.getActiveStreets = async (req, res, next) => {
    try {
        const streets = await StreetService.getActiveStreets();
        const encryptedData = encryptData(streets)
        res.status(200).json({
            status: true,
            message: "Streets retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.getWardByWardName = async (req, res, next) => {
    try {
        const {  ward_name } = req.query;
        const street = await StreetService.getActive(ward_name);
        if (!street) {
            return res.status(404).json({ status: false, message: "Street not found" });
        }
        const encryptedData = encryptData(street)
        res.status(200).json({
            status: true,
            message: "Street retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.getWardByWardNameGuest = async (req, res, next) => {
    try {
        const {  ward_name } = req.query;
        const street = await StreetService.getActive(ward_name);
        if (!street) {
            return res.status(404).json({ status: false, message: "Street not found" });
        }
        const encryptedData = encryptData(street)
        res.status(200).json({
            status: true,
            message: "Street retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.getStreetById = async (req, res, next) => {
    try {
        const { ward_id, street_id } = req.query;
        const street = await StreetService.getStreetById(ward_id, street_id);
        if (!street) {
            return res.status(404).json({ status: false, message: "Street not found" });
        }
        const encryptedData = encryptData(street)
        res.status(200).json({
            status: true,
            message: "Street retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.getStreetId = async (req, res, next) => {
    try {
        const {  street_id } = req.query;
        const street = await StreetService.getStreetId(street_id);
        if (!street) {
            return res.status(404).json({ status: false, message: "Street not found" });
        }
        const encryptedData = encryptData(street)
        res.status(200).json({
            status: true,
            message: "Street retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};
exports.updateStreet = async (req, res, next) => {
    try {
      const { street_id } = req.query;
      const { zone_id,zone_name,ward_id,ward_name,street_name, status } = req.body;
  
    
      const street = await StreetService.getStreetId(street_id);
      if (!street) {
        return res.status(404).json({ status: false, message: "Street not found" });
      }
  
      const updatedStreet = await StreetService.updateStreetById(street_id, {
        zone_id,
        zone_name,
        ward_id,
        ward_name,
        street_name,
        status
      });
  
      return res.status(200).json({ status: true, message: "Street Updated successfully" });
    } catch (error) {
      next(error);
    }
  };

exports.deleteStreetById = async (req, res, next) => {
    try {
        const { street_id } = req.query;
        const result = await StreetService.deleteStreetById(street_id);
        if (!result) {
            return res.status(404).json({ status: false, message: "Street not found" });
        }
        res.status(200).json({
            status: true,
            message: "Street deleted successfully"
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
            const result = await StreetService.bulkInsert(csvs);
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