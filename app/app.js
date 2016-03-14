
var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var Listing = require('./models/Listing');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require("config")

mongoose.connect(config.get("mongo").url);

mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ', config.get("mongo").url);
}); 


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.get('/', function(req, res, next) {
	res.render('index.ejs');
});

app.get('/listings/:id', function (req, res) {
	
	Listing.findById(req.params.id, function (err, listing) {
		res.json(listing);	
	});
});

app.route('/listings')
	.post(function (req, res, next) {
		var listing = new Listing(req.body);
		listing.save(function (err, saved) {
			if (err) throw err;

			res.json(saved);
		});
	})
	.put(function (req, res, next) {
		var listing = Listing.findByIdAndUpdate(req.body._id,
			{
				$set: req.body
			}, function (err, saved) {
				if (err) throw err;

				res.json(saved);
		});
	});

app.get('/all', function (req, res, next) {
	Listing.find([], function (err, listings) {
		console.log(listings);

		res.json(listings);
	});
});

app.use(express.static(path.join(__dirname, '../web')));

app.listen(5000);