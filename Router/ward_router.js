const express = require('express');
const router = express.Router();
const wardController = require('../Controller/ward_Controller');
const verifyToken = require('../Authorization');

router.post('/post',verifyToken, wardController.createWard);
router.get('/get',verifyToken, wardController.getAllWards);
router.get('/getactive',verifyToken, wardController.getActiveWards);
router.get('/getbyid/:zone_id/:ward_id',verifyToken, wardController.getWardById);
router.get('/getbyid',verifyToken, wardController.getWardId);
router.delete('/delete',verifyToken, wardController.deleteWardById);
router.post('/update',verifyToken, wardController.updateWard);
module.exports = router;