define([
	'application',
	'modules/preview/preview.controller'
], function (App, PreviewController) {
	App.module('Preview', function (Preview, App, Backbone, Marionette, $, _) {

		Preview.Router = Marionette.AppRouter.extend({
			appRoutes: {
				'listing/(:listing)': 'show'
			}
		});

		App.addInitializer(function() {
			new Preview.Router({
				controller: new PreviewController()
			});
		});

	});

	return App.Preview;
});
