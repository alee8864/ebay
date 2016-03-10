define([
	'application',
	'models/listingModel',
	'modules/main/main.views',
	'modules/listingForm/listingForm.views',
	'modules/preview/preview.controller'
], function (App, ListingModel, MainViews, ListingFormViews, PreviewController) {
	App.module('Main', function (Main, App, Backbone, Marionette, $, _) {
		Main.Controller = Marionette.Controller.extend({
			show: function () {
				var previewController = new PreviewController();
				var listingModel = new ListingModel();
				var tabLayout = new MainViews.TabView();
				var pageLayout = new MainViews.PageLayout();


				tabLayout.on('show', function () {
					
					var formView = new ListingFormViews.FormItemView({
						model: listingModel
					});

					var previewView = previewController.getLayoutView(listingModel);

					previewView.listenTo(previewView.model, 'change', function () {
						tabLayout.listingPreviewRegion.show(previewView);
					});

					tabLayout.listingFormRegion.show(formView);
					tabLayout.listingPreviewRegion.show(previewView);
				});

				App.mainRegion.show(tabLayout);
			}
		});
	});

	return App.Main.Controller;
});

