const express = require('express');
const router = express.Router();
const roleController = require('../Controller/role_controller');
const verifyToken = require('../Authorization');

router.post('/post',verifyToken, roleController.createRole);
router.get('/get',verifyToken, roleController.getAllRoles);
router.get('/getbyid',verifyToken, roleController.getRoleById);
router.delete('/delete',verifyToken, roleController.deleteRoleById);
module.exports = router;
