const express = require('express');
const router = express.Router();
const translateController = require('../Controller/translate_controller');

router.post('/translate', translateController.translate);

module.exports = router;