var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Listing = new Schema({
	title: String,
	description: String,
	products: [{
		title: String,
		description: String,
		image_link: String,
		thumbnail_link: String
	}]
});

var Listing = mongoose.model('Listing', Listing);

module.exports = Listing;