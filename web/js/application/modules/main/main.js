define([
	'application',
	'modules/main/main.controller'
], function (App, MainController) {
	App.module('Main', function (Main, App, Backbone, Marionette, $, _) {

		Main.Router = Marionette.AppRouter.extend({
			appRoutes: {
				'(listing)': 'show'
			}
		});

		App.addInitializer(function() {
			new Main.Router({
				controller: new MainController()
			});
		});

	});

	return App.Main;
})
