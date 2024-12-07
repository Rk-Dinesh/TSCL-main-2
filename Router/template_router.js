const express = require('express');
const router = express.Router();
const templateController = require('../Controller/template_controller');
const verifyToken = require('../Authorization');

router.post('/post',verifyToken, templateController.createTemplate);
router.get('/get',verifyToken, templateController.getAllTemplate);
router.get('/getbyid',verifyToken, templateController.getTemplateById);
router.delete('/delete',verifyToken, templateController.deleteTemplateById);
router.post('/update',verifyToken, templateController.updateTemplate);

module.exports = router;
