var application = new Marionette.Application();

application.addRegions({
	"mainRegion": ".js-region-main"
});

application.on("start", function() {
    if (Backbone.history) {
        Backbone.history.start();
    }
});

return application;