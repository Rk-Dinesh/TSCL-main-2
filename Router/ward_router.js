const express = require('express');
const router = express.Router();
const wardController = require('../Controller/ward_Controller');

router.post('/post', wardController.createWard);
router.get('/get', wardController.getAllWards);
router.get('/getbyid/:zone_id/:ward_id', wardController.getWardById);
router.delete('/delete', wardController.deleteWardById);
module.exports = router;