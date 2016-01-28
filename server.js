'use strict';

var express = require('express');
var app = express();
var PORT = process.env.PORT || 5000;

require('./routes/routes.js')(app);

app.listen(PORT);
console.log("Server running on " + PORT);
