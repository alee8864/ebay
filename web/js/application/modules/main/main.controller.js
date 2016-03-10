define([
	'application',
	'models/listingModel',
	'modules/main/main.views',
	'modules/listingForm/listingForm.views'
], function (App, ListingModel, MainViews, listingFormViews) {
	App.module('Main', function (Main, App, Backbone, Marionette, $, _) {
		Main.Controller = Marionette.Controller.extend({
			show: function () {
				var pageLayout = new MainViews.PageLayout();

				pageLayout.on('show', function () {
					var listingModel = new ListingModel();
					var form = new listingFormViews.FormItemView({
						model: listingModel
					});
					pageLayout.formRegion.show(form);
				});

				App.mainRegion.show(pageLayout);
			}
		});
	});

	return App.Main.Controller;
});

