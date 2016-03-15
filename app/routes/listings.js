var express = require('express');
var Listing = require('../models/Listing');

module.exports = function (app) {
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
			res.json(listings);
		});
	});
};