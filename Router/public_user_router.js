const express = require('express');
const router = express.Router();
const publicUserController = require('../Controller/public_user_controller');
const verifyToken = require('../Authorization');

router.post('/post', publicUserController.createPublicUser);
router.post('/login', publicUserController.loginPublicUser);
router.post('/loginweb', publicUserController.loginPublicUserweb);
router.get('/get',verifyToken, publicUserController.getAllPublicUsers);
router.get('/getbyid',verifyToken, publicUserController.getPublicUserById);
router.get('/getbyphone',verifyToken, publicUserController.getPublicUserPhone);
router.post('/forgotpassword',verifyToken,publicUserController.forwardPassword);
router.post('/changePassword',verifyToken,publicUserController.changePassword);
router.delete('/delete',verifyToken, publicUserController.deletePublicUserById);
router.post('/update',verifyToken, publicUserController.updatePublicUser);
module.exports = router;
