define([
	'application',
	'modules/listing/listing.controller'
], function (App, ListingController) {
	App.module('Listing', function (Listing, App, Backbone, Marionette, $, _) {

		Listing.Router = Marionette.AppRouter.extend({
			appRoutes: {
				'listing/(:listing)': 'show'
			}
		});

		App.addInitializer(function() {
			new Listing.Router({
				controller: new ListingController()
			});
		});

	});

	return App.Listing;
});
