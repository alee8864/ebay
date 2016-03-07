define([
	'application',
	'modules/main/main.views',
	'modules/listingForm/listingForm.views'
], function (App, MainViews, listingFormViews) {
	App.module('Main', function (Main, App, Backbone, Marionette, $, _) {
		Main.Controller = Marionette.Controller.extend({
			show: function () {
				var pageLayout = new MainViews.PageLayout();

				pageLayout.on('show', function () {
					var form = new listingFormViews.FormItemView();
					pageLayout.formRegion.show(form);
				});

				App.mainRegion.show(pageLayout);
			}
		});
	});

	return App.Main.Controller;
});

