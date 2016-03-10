define([
	'application',
	'models/listingModel',
	'modules/listing/listing.views',
	"models/models"
], function (App, ListingModel, ListingViews, models) {

	App.module('Listing', function (Listing, App, Backbone, Marionette, $, _) {
		Listing.Controller = Marionette.Controller.extend({
			show: function () {
				var listingModel = new ListingModel();
				var layout = new ListingViews.Layout({
					 model: listingModel
				});

				listingModel.fetch({
					success: function () {
						App.mainRegion.show(layout);
					}
				});


				layout.on('show', function () {
					var headerView = new ListingViews.Section({
						model: new models.SectionModel({
							view: ListingViews.ListingHeader,
							viewModel: listingModel
						})
					});

					var itemSectionViewModel = new Backbone.Model({
						collection: new models.ItemCollection(listingModel.get("items"))
					});

					var collectionView = new ListingViews.Section({
						model: new models.SectionModel({
							header: "Auctioned Items",
							viewModel: itemSectionViewModel,
							view: ListingViews.ItemCollection
						})
					});

					var shippingView = new ListingViews.Section({
						model: new models.SectionModel({
							header: "Shipping info",
							view: ListingViews.ShippingView
						})
					});

					var disclaimerView = new ListingViews.Section({
						model: new models.SectionModel({
							header: "Other Info",
							view: ListingViews.DisclaimerView
						})
					});

					layout.itemRegion.show(collectionView);
					layout.headerRegion.show(headerView);
					layout.shippingRegion.show(shippingView);
					layout.disclaimerRegion.show(disclaimerView);
				});

				
			}
		});

	});


	return App.Listing.Controller;
});
