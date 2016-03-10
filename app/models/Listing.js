var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Listing = new Schema({
	_id: 
	title: String,
	description: String,
	products: [
		title: '',
		description: '',
		image_link: ''
	]
});

mongoose.model('Listing', Listing);
mongoose.connect('mongodb://localhost/listing');