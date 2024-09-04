const express = require('express');
const router = express.Router();
const desginationController = require('../Controller/designation_controller');
const verifyToken = require('../Authorization');

router.post('/post',verifyToken, desginationController.createDesignation);
router.get('/get',verifyToken, desginationController.getAllDesignation);
router.get('/getactive',verifyToken, desginationController.getActiveDesignation);
router.get('/getbyid',verifyToken, desginationController.getDesignationById);
router.delete('/delete',verifyToken, desginationController.deleteDesignationById);
router.post('/update',verifyToken, desginationController.updateDesignation);
module.exports = router;
