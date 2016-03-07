define([
	'application',
	'modules/listingForm/listingForm.views'
], function (App, MainViews) {
	App.module('Main', function (Main, App, Backbone, Marionette, $, _) {
		Main.Controller = Marionette.Controller.extend({
			show: function () {
				var pageLayout = new MainViews.PageLayout();

				App.mainRegion.show(pageLayout);
			}
		});
	});

	return App.Main.Controller;
});

