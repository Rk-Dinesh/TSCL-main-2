const express = require('express');
const router = express.Router();
const roleAccessLevelController = require('../Controller/role_access_level_controller');

router.post('/post', roleAccessLevelController.createRoleAccessLevel);
router.get('/get', roleAccessLevelController.getAllRoleAccessLevels);

module.exports = router;
