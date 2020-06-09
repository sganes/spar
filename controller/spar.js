const soap = require('soap');
const request = require('request');

exports.getPersonalDetails = (req, res) => {
    res.status(201).json(processRequest(req.params.personalNumber));
}

function processRequest(personalNumber){
   const url = 
}