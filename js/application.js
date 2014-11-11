var application = new Marionette.Application();

application.addRegions({
	"mainRegion": ".contentRegion"
});

application.on("start", function() {
    if (Backbone.history) {
        Backbone.history.start();
    }
});