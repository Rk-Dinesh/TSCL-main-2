const WardService = require('../Service/ward_Service');
const IdcodeServices = require('../Service/idcode_Service');
const encryptData = require('../encryptedData');
const csvParser = require('csv-parser');
const fs = require('fs');
const path = require('path');
const ZoneModel = require('../Models/zone');
const WardModel = require('../Models/ward');

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

exports.uploadCSVa = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const createdByUser = req.body.created_by_user; 
        if (!createdByUser) {
            return res.status(400).json({ error: 'created_by_user is required' });
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
                    
                    const result = await WardService.bulkInsert(csvs, createdByUser);
                    res.status(200).json(result);
                } catch (error) {
                    next(error);
                } finally {
                    
                    fs.unlinkSync(filePath);
                }
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

        const createdByUser  = req.body.created_by_user; 
        if (!createdByUser ) {
            return res.status(400).json({ error: 'created_by_user is required' });
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
                    for (let csv of csvs) {
                        const zone = await ZoneModel.findOne({
                            zone_id: csv.zone_id,
                        });

                        if (!zone) {
                            return res.status(400).json({ error: `Zone not found for zone_id: ${csv.zone_id}` });
                        }

                        const existingWard = await WardModel.findOne({ ward_name: csv.ward_name });
                        if (existingWard) {
                            return res.status(400).json({ error: `Duplicate ward_name: ${csv.ward_name}` });
                        }

                        csv.zone_name = zone.zone_name;
                        csv.ward_id = await IdcodeServices.generateCode('Ward');
                        csv.status = 'active'; 
                        csv.created_by_user = createdByUser ; 
                    }

                    const result = await WardModel.insertMany(csvs);
                    return res.status(200).json(result);
                } catch (error) {
                    return res.status(500).json({ error: 'An unexpected error occurred' });
                } finally {
                   
                    fs.unlinkSync(filePath);
                }
            });
    } catch (error) {
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
};
