application.module("List", function (mod, app, bb, m, $, _) {

	mod.Router = Marionette.AppRouter.extend({
		appRoutes: {
			"": "show"
		}
	});

	app.addInitializer(function() {
		new mod.Router({
			controller: new mod.Controller()
		});
	});

});