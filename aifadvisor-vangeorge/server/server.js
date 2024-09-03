require('dotenv').config();
const express = require("express");
const app = express();
const api1 = require('./aichatbot.js');
const api2 = require('./index.js');

// Mount API 1 on /api1
app.use('/api1', api1);
// Mount API 1 on /api1
app.use('/api2', api2);

//Start the server on a single port
app.listen(4000, () => {
    console.log('Server listening on port 4000');

});