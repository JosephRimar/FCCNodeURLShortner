
module.exports = function(app){
	var validator = require('validator');


	app.use('/', function(req, res) {
		//pull url from request
		var originalURL = req.url.substring(1);
		//validate URL
		console.log(originalURL);
		if(validator.isURL(originalURL, {require_protocol: true})) {
			res.end(JSON.stringify({
				originalURL: originalURL,
				shortURL: 1
			}));
		}
		else {
			res.end("URL is invalid");
		}
	});
}
