# Project Title

The API gathers information from a database that includes all persons who are registered as residents in Sweden, known as the SPAR register.

## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

## Installation

    $ git clone https://github.com/sganes/spar.git
    $ cd PROJECT_TITLE
    $ npm install

##  Setting up local server  

    $ node ./app.js (server is up on port 8080)
    $ send request to http://localhost:8080/api/spar/:personalNumber to fetch the details 
    $ personalNumber - Accepted formats are xxxxxx-xxxx(6 digits - 4 digits), xxxxxxxxxxxx(12 digits), xxxxxxxxxx(10 digits))

