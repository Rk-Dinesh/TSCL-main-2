const express = require('express');
const router = express.Router();
const roleAccessLevelController = require('../Controller/role_access_level_controller');
const verifyToken = require('../Authorization');

router.post('/post',verifyToken, roleAccessLevelController.createRoleAccessLevel);
router.post('/update',verifyToken, roleAccessLevelController.updateRoles);
router.get('/get',verifyToken, roleAccessLevelController.getAllRoleAccessLevels);
router.get('/getactive',verifyToken, roleAccessLevelController.getActiveRoleAccessLevels);
router.get('/getbyid',verifyToken, roleAccessLevelController.getRoleById);
router.delete('/delete',verifyToken, roleAccessLevelController.deleteRoleById);

module.exports = router;
