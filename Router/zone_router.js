const express = require('express');
const router = express.Router();
const zoneController = require('../Controller/zone_Controller');

router.post('/post', zoneController.createZone);
router.get('/get', zoneController.getAllZones);
router.get('/getbyid', zoneController.getZoneById);
router.delete('/delete', zoneController.deleteZoneById);
module.exports = router;
