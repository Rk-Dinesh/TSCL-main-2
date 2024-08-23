const express = require('express');
const router = express.Router();
const organizationController = require('../Controller/organization_controller');
const verifyToken = require('../Authorization');

router.post('/post',verifyToken, organizationController.createOrganization);
router.get('/get',verifyToken, organizationController.getAllOrganizations);
router.get('/getbyid',verifyToken, organizationController.getOrganizationById);
router.delete('/delete',verifyToken, organizationController.deleteOrganizationById);
router.post('/update',verifyToken, organizationController.updateOrganization);
module.exports = router;
