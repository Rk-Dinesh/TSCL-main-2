const express = require('express');
const router = express.Router();
const userController = require('../Controller/user_controller');

router.post('/post', userController.createUser);
router.get('/get', userController.getAllUsers);
router.delete('/delete', userController.deleteUserById);
module.exports = router;
