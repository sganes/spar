const soap = require('soap');
const fs = require('fs');
const url = './test-20160213.wsdl';

const arg = {
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
            "spako:FysiskPersonId": "197911072390"
        }
    }
}

exports.getPersonalDetails = async (req, res) => {
    try {
        const result = await processSoapRequest();
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ err });
    }

}

function processSoapRequest() {
    return new Promise((resolve, reject) => {
        soap.createClient(url, (err, client) => {
            if (err)
                console.log('error creating client');
            client.setSecurity(new soap.ClientSSLSecurity('./tls.key', './tls.crt'));
            client.SPARPersonsokningService.SPARPersonsokningSoap11.SPARPersonsokning(arg, (err, result, body) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    });
}

