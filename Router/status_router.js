const express = require('express');
const router = express.Router();
const statusController = require('../Controller/status_controller');
const verifyToken = require('../Authorization');

router.post('/post',verifyToken, statusController.createstatus);
router.get('/get',verifyToken, statusController.getAllstatus);
router.get('/getactive',verifyToken, statusController.getActivestatus);
router.get('/getbyid',verifyToken, statusController.getstatusById);
router.delete('/delete',verifyToken, statusController.deletestatusById);
router.post('/update',verifyToken,  statusController.updatestatus);
module.exports = router;
