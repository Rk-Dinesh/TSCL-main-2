const express = require('express');
const router = express.Router();
const AlohaaAgentController = require('../Controller/alohaagent_controller');
const verifyToken = require('../Authorization');

router.post('/post',verifyToken, AlohaaAgentController.createAgent);
router.get('/getall',verifyToken, AlohaaAgentController.getAllAgent);
router.delete('/delete',verifyToken, AlohaaAgentController.deleteAgentById);


module.exports = router;