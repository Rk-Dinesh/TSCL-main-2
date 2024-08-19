const express = require('express');
const router = express.Router();
const userController = require('../Controller/user_controller');
const verifyToken = require('../Authorization');

router.post('/post',verifyToken, userController.createUser);
router.post('/login', userController.loginUser);
router.post('/loginweb', userController.loginUserweb);
router.get('/get',verifyToken, userController.getAllUsers);
router.delete('/delete',verifyToken, userController.deleteUserById);
module.exports = router;
