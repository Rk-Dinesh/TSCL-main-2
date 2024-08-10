const express = require('express');
const router = express.Router();
const streetController = require('../Controller/street_controller');

router.post('/post', streetController.createStreet);
router.get('/get', streetController.getAllStreets);
router.get('/getbyid/:ward_id/:street_id', streetController.getStreetById);
router.delete('/delete', streetController.deleteStreetById);
module.exports = router;
