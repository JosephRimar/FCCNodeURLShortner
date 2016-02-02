'use strict';

var express = require('express');
var app = express();
var PORT = process.env.PORT || 5000;
var mongoose = require('mongoose');

if(process.env.PORT) {
	//connect to correct remote db
	mongoose.connect('');
} else {
	mongoose.connect('mongodb://localhost/fccurls');
}


require('./routes/routes')(app);

app.listen(PORT);
console.log("Server running on " + PORT);
