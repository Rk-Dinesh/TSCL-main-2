const express = require('express');
const router = express.Router();
const roleController = require('../Controller/role_controller');

router.post('/post', roleController.createRole);
router.get('/get', roleController.getAllRoles);
router.get('/getbyid', roleController.getRoleById);
router.delete('/delete', roleController.deleteRoleById);
module.exports = router;
