define([
	'application',
	'models/listingModel',
	'modules/main/main.views',
	'modules/listingForm/listingForm.views',
	'modules/preview/preview.controller',
	'modules/preview/preview.views'
], function (App, ListingModel, MainViews, ListingFormViews, PreviewController, PreviewViews) {
	App.module('Main', function (Main, App, Backbone, Marionette, $, _) {
		Main.Controller = Marionette.Controller.extend({
			show: function (listingId) {
				var previewController = new PreviewController();
				var listingModel = listingId ? new ListingModel({'_id': listingId}) : new ListingModel();
				var tabLayout = new MainViews.TabView();
				var pageLayout = new MainViews.PageLayout();

				tabLayout.on('show', function () {
					
					var formView = new ListingFormViews.FormItemView({
						model: listingModel
					});

					var previewView = previewController.getLayoutView(listingModel);
					var listingContainer = new PreviewViews.TabView();

					listingContainer.on('show', function () {
						listingContainer.listingContainer.show(previewView);
					});

					previewView.listenTo(previewView.model, 'change', function () {
						tabLayout.listingPreviewRegion.show(listingContainer);
					});

					tabLayout.listingFormRegion.show(formView);
					tabLayout.listingPreviewRegion.show(listingContainer);
				});

				if (listingModel.id) {
					listingModel.fetch({
						success: function (listing, data) {
							App.mainRegion.show(tabLayout);
						}
					});	
				} else {
					App.mainRegion.show(tabLayout);
				}

				
			}
		});
	});

	return App.Main.Controller;
});

