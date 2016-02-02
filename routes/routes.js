
module.exports = function(app){
	var validator = require('validator');
	var URL = require('../models/models');


	app.use('/', function(req, res) {
		//Pull url from request
		var originalURL = req.url.substring(1);

		//If URL is valid
		if(validator.isURL(originalURL, {require_protocol: true})) {

			//Call serchByValidUrl method
			URL.searchByValidUrl(req, res, originalURL);

		}
		//If url is an integer  
		else if (validator.isInt(originalURL)) {
			//Call serchByIntUrl method
			URL.findByIntUrl(req, res, originalURL);
		}
		//If URL is invalid and not an integer	
		else {
			res.end("Not a valid URL");
		}
	
	});

}
