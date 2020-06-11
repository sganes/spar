const express = require('express');
const { param } = require('express-validator');

const sparController = require('../controller/spar');
const router = express.Router();

router.get('/spar/:personalNumber', [
    param('personalNumber', 'Invalid personalNumber - Accepted formats are -  xxxxxx-xxxx(6 digits - 4 digits), xxxxxxxxxxxx(12 digits), xxxxxxxxxx(10 digits)').custom(value => validatePersonalNumber(value))
], sparController.getPersonalDetails);

function validatePersonalNumber(personalNumber) {
    return personalNumber.match(/^\d{10}$/g) || personalNumber.match(/^\d{12}$/g) || personalNumber.match(/^\d{6}-\d{4}$/g);
}

module.exports = router;