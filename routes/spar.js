const express = require('express');
const sparController = require('../controller/spar');
const router = express.Router();

router.get('/spar',sparController.getPersonalDetails);

module.exports = router;