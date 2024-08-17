const express = require('express');
const router = express.Router();
const publicUserController = require('../Controller/public_user_controller');

router.post('/post', publicUserController.createPublicUser);
router.post('/login', publicUserController.loginPublicUser);
router.post('/loginweb', publicUserController.loginPublicUserweb);
router.get('/get', publicUserController.getAllPublicUsers);
router.get('/getbyid', publicUserController.getPublicUserById);
router.delete('/delete', publicUserController.deletePublicUserById);
module.exports = router;
