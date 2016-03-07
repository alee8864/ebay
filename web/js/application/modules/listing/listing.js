application.module('Listing', function (mod, app, bb, m, $, _) {

	mod.Router = Marionette.AppRouter.extend({
		appRoutes: {
			'listing/(:listing)': 'show'
		}
	});

	app.addInitializer(function() {
		new mod.Router({
			controller: new mod.Controller()
		});
	});

});