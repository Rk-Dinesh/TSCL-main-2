const express = require('express');
const router = express.Router();
const AlohaaController = require('../Controller/alohaa_controller');

router.post('/incoming', AlohaaController.createAlohaa);
router.post('/outgoing', AlohaaController.createAlohaa);
router.get('/lastcall', AlohaaController.getalohaabyagent);
router.get('/lastuser', AlohaaController.getalohaabyPhone);
router.get('/missedcall', AlohaaController.getalohaaMissedCall);

module.exports = router;