const express = require('express');
const router = express.Router();
const wardController = require('../Controller/ward_Controller');
const verifyToken = require('../Authorization');

router.post('/post',verifyToken, wardController.createWard);
router.get('/get',verifyToken, wardController.getAllWards);
router.get('/getbyid/:zone_id/:ward_id',verifyToken, wardController.getWardById);
router.delete('/delete',verifyToken, wardController.deleteWardById);
module.exports = router;