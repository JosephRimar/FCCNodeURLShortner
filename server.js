'use strict';

var express = require('express');
var app = express();
var PORT = process.env.PORT || 5000;
var mongoose = require('mongoose');

//If hosted on heroku
if(process.env.PORT) {
	//connect to correct remote db
	mongoose.connect('mongodb://joe:password@ds055545.mongolab.com:55545/joesfreecodecamp');
//If on local machine
} else {
	mongoose.connect('mongodb://localhost/fccurls');
}


require('./routes/routes')(app);

app.listen(PORT);
console.log("Server running on " + PORT);
