const soap = require('soap');
const { validationResult } = require('express-validator');
const url = './test-20160213.wsdl';

exports.getPersonalDetails = async (req, res) => {
    try {
        const personalNumber = await validatePersonalNumber(req);
        let arg = {
            "spako:IdentifieringsInformation": {
                "spako:KundNrLeveransMottagare": "500243",
                "spako:KundNrSlutkund": "500243",
                "spako:OrgNrSlutkund": "3102263153",
                "spako:SlutAnvandarId": "foretag-200428",
                "spako:Tidsstampel": "2020-04-28T15:35:00.000"
            },
            "spako:PersonsokningFraga":
            {
                "spako:PersonId":
                {
                    "spako:FysiskPersonId": ""
                }
            }
        }
        arg['spako:PersonsokningFraga']['spako:PersonId']['spako:FysiskPersonId'] = personalNumber;
        const result = await processSoapRequest(arg);
        res.status(200).json(result);
    } catch (err) {
        res.status(err.status || 500).json(err.message || err);
    }

}

//send request to the SPARPersonsoking to getch the details
function processSoapRequest(arg) {
    return new Promise((resolve, reject) => {
        soap.createClient(url, (err, client) => {
            if (err)
                reject(err);
            client.setSecurity(new soap.ClientSSLSecurity('./tls.key', './tls.crt'));
            client.SPARPersonsokningService.SPARPersonsokningSoap11.SPARPersonsokning(arg, (err, result, body) => {
                if (err)
                    reject(err);
                else {
                    if (result.Undantag && result.Undantag.Kod && result.Undantag.Kod === "OGILTIG_INPARAMETER") {
                        const err = {
                            status: 422,
                            message: 'Not a valid personal number'
                        }
                        reject(err);
                    }
                    if (result.PersonsokningSvarsPost)
                        resolve(result.PersonsokningSvarsPost);
                    else {
                        const err = {
                            status: 404,
                            message: `Data not found for the personal number ${arg['spako:PersonsokningFraga']['spako:PersonId']['spako:FysiskPersonId']}`
                        }
                        console.log(err)
                        reject(err);
                    }

                }
            });
        });
    });
}

//Validator the personal number digits and format
function validatePersonalNumber(req) {
    return new Promise((resolve, reject) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            reject({
                message: errors.array(),
                status: 422
            });
        }
        resolve(formatPersonalNumber(req.params.personalNumber));
    });
}

//fomat the 10 digit personal bumber to a valid 12 digit number
function formatPersonalNumber(personalNumber) {
    let formattedPersonalNumber = personalNumber;
    if (personalNumber.match(/^\d{6}-\d{4}$/g)) {
        [sixDigit, fourDigit] = personalNumber.split('-');
        personalNumber = sixDigit + fourDigit;
    }
    if (personalNumber.length === 10) {
        const currentYear = new Date().getFullYear();
        const givenYear = personalNumber.substring(0, 2);
        if (currentYear - Number('19' + givenYear) <= 100)
            formattedPersonalNumber = '19' + personalNumber;
        else
            formattedPersonalNumber = '20' + personalNumber;
    }
    return formattedPersonalNumber;
}      