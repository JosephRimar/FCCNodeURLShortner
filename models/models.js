'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create url Schema
var urlSchema = new Schema({
	original: String,
	shortened: String
});
var host = "https://fccurlshortner.herokuapp.com/";

//create SavedURL model
var SavedURLs = mongoose.model('SavedURLs', urlSchema);

SavedURLs.searchByValidUrl = function(req, res, name) {

	//Query db by provided URL
	SavedURLs.find({original: name}, function(err, url) {
		if(err) throw err;

		//if found send results
		if(url.length) {
			console.log("URL exists");
			
			res.end(JSON.stringify({
				originalURL: url[0].original,
				shortURL: host + url[0].shortened
			}));
		}
		else {
			SavedURLs.count({}, function(err, count){
				if(err) return err;
				var newURL;
				var shortURL;

				//new short url is current count + 1
				shortURL = (count + 1).toString();
				console.log(shortURL);

				//create new entry in URL collection
				newURL = new SavedURLs({original: name, shortened: shortURL});
				//save entry to db
				newURL.save(function(err) {
					if(err) {
						return (err)
					} else {
						console.log("URL Saved!: " + newURL);
					}
				});
				//Send response with new info to client
				res.end(JSON.stringify({
					originalURL: name,
					shortURL: host + newURL.shortened
				}));
			});
		}
	});
}

SavedURLs.findByIntUrl = function(req, res, int) {
	//Query db for provided short URL
	SavedURLs.find({shortened: int}, function(err, urls) {
		if(err) throw err;

		//If short URL found
		if(urls.length) {
			console.log(host + urls[0].original)

			//Redirect to appropriate location
			res.redirect(urls[0].original);
			res.end();
		}
		//If no match is found
		else {
			res.end("No short URL matching");
		}
	});
}

//export model
module.exports = SavedURLs;
