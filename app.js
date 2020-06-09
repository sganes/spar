const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/spar');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use('/api', routes);

app.listen(port, () => {
    console.log('Server is up on port 8080');
})