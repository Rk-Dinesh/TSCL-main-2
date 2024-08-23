const express = require('express');
const router = express.Router();
const zoneController = require('../Controller/zone_Controller');
const verifyToken = require('../Authorization');

router.post('/post',verifyToken, zoneController.createZone);
router.get('/get',verifyToken, zoneController.getAllZones);
router.get('/getgrievance',verifyToken, zoneController.getAllZonesGrivence);
router.get('/getbyid',verifyToken, zoneController.getZoneById);
router.delete('/delete',verifyToken, zoneController.deleteZoneById);
router.post('/update', zoneController.updateZone);
module.exports = router;
