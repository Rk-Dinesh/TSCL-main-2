const ZoneService = require('../Service/zone_Service');
const IdcodeServices = require('../Service/idcode_Service'); // Assuming this exists
const encryptData = require('../encryptedData');
const csvParser = require('csv-parser');
const fs = require('fs');
const path = require('path');

exports.createZone = async (req, res, next) => {
    try {
        const { zone_name, status, created_by_user } = req.body;
        const zone_id = await IdcodeServices.generateCode("Zone");
        const zone = await ZoneService.createZone({ zone_id, zone_name, status, created_by_user });
        
        res.status(200).json({
            status: true,
            message: "Zone created successfully"
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllZones = async (req, res, next) => {
    try {
        const zones = await ZoneService.getAllZones();
        const encryptedData = encryptData(zones)
        res.status(200).json({
            status: true,
            message: "Zones retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.getActiveZones = async (req, res, next) => {
    try {
        const zones = await ZoneService.getActiveZones();
        const encryptedData = encryptData(zones)
        res.status(200).json({
            status: true,
            message: "Zones retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};



exports.getZoneById = async (req, res, next) => {
    try {
        const { zone_id } = req.query;
        const zone = await ZoneService.getZoneById(zone_id);
        if (!zone) {
            return res.status(404).json({ status: false, message: "Zone not found" });
        }
        const encryptedData = encryptData(zone)
        res.status(200).json({
            status: true,
            message: "Zone retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};
exports.updateZone = async (req, res, next) => {
    try {
      const { zone_id } = req.query;
      const { zone_name, status } = req.body;
  
    
      const zone = await ZoneService.updateZoneById(zone_id);
      if (!zone) {
        return res.status(404).json({ status: false, message: "Zone not found" });
      }
  
      const updateZone = await ZoneService.updateZoneById(zone_id, {
        zone_name,
        status
      });
  
      return res.status(200).json({ status: true, message: "Zone Updated successfully" });
    } catch (error) {
      next(error);
    }
  };

exports.deleteZoneById = async (req, res, next) => {
    try {
        const { zone_id } = req.query;
        const result = await ZoneService.deleteZoneById(zone_id);
        if (!result) {
            return res.status(404).json({ status: false, message: "Zone not found" });
        }
        res.status(200).json({
            status: true,
            message: "Zone deleted successfully"
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
            const result = await ZoneService.bulkInsert(csvs);
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