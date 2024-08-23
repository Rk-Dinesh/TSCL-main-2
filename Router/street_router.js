const express = require('express');
const router = express.Router();
const streetController = require('../Controller/street_controller');
const verifyToken = require('../Authorization');

router.post('/post',verifyToken, streetController.createStreet);
router.get('/get',verifyToken, streetController.getAllStreets);
router.get('/getbyid/:ward_id/:street_id',verifyToken, streetController.getStreetById);
router.delete('/delete',verifyToken, streetController.deleteStreetById);
router.post('/update', streetController.updateStreet);
module.exports = router;
