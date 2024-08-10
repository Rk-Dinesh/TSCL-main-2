const express = require('express');
const router = express.Router();
const publicUserController = require('../Controller/public_user_controller');

router.post('/post', publicUserController.createPublicUser);
router.get('/get', publicUserController.getAllPublicUsers);
router.get('/getbyid', publicUserController.getPublicUserById);
router.delete('/delete', publicUserController.deletePublicUserById);
module.exports = router;
