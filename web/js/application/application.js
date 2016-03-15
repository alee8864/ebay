define(['marionette'], function (Marionette) {
	var Application = new Marionette.Application();

	Application.addRegions({
		"mainRegion": ".js-region-main"
	});

	Application.on("start", function() {
		if (Backbone.history) {
			Backbone.history.start();
		}
	});

	return Application;
});

