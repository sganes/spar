const express = require('express');
const sparController = require('../controller/spar');
const router = express.Router();

router.get('/spar/:personalNumber',sparController.getPersonalDetails);

module.exports = router;