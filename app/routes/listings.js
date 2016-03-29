var express = require('express');
var Listing = require('../models/Listing');
var router = express.Router();

module.exports = function (app) {
	app.route('/listings/:id')
	.get(function (req, res) {
		
		Listing.findById(req.params.id, function (err, listing) {
			res.json(listing);	
		});
	})
	.put(function (req, res) {
		var listing = Listing.findByIdAndUpdate(req.body._id,
			{
				$set: req.body
			}, function (err, saved) {
				if (err) throw err;

				res.json(saved);
		});
	});

	app.route('/listings')
	.post(function (req, res) {
		var listing = new Listing(req.body);
		listing.save(function (err, saved) {
			if (err) throw err;

			res.json(saved);
		});
	});

	app.get('/all', function (req, res) {
		Listing.find([], function (err, listings) {
			res.json(listings);
		});
	});
};