const express = require('express');
const router = express.Router();
const roleAccessLevelController = require('../Controller/role_access_level_controller');
const verifyToken = require('../Authorization');

router.post('/post',verifyToken, roleAccessLevelController.createRoleAccessLevel);
router.post('/update', roleAccessLevelController.updateRoles);
router.get('/get', roleAccessLevelController.getAllRoleAccessLevels);
router.get('/getbyid', roleAccessLevelController.getRoleById);
router.delete('/delete', roleAccessLevelController.deleteRoleById);

module.exports = router;
