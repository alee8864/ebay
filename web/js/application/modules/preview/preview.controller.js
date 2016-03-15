define([
	'application',
	'models/listingModel',
	'modules/preview/preview.views',
	"models/sectionModel"
], function (App, ListingModel, ListingViews, SectionModel) {

	App.module('Preview', function (Preview, App, Backbone, Marionette, $, _) {
		Preview.Controller = Marionette.Controller.extend({
			getLayoutView: function (listingModel) {
				var layout = new ListingViews.Layout({
					 model: listingModel
				});


				layout.on('render', function () {
					var headerView = new ListingViews.Section({
						model: new SectionModel({
							view: ListingViews.ListingHeader,
							viewModel: listingModel
						})
					});

					var itemSectionViewModel = new Backbone.Model({
						collection: listingModel.get("products")
					});

					var collectionView = new ListingViews.Section({
						model: new SectionModel({
							header: "Auctioned Items",
							viewModel: itemSectionViewModel,
							view: ListingViews.ItemCollection
						})
					});

					var shippingView = new ListingViews.Section({
						model: new SectionModel({
							header: "Shipping info",
							view: ListingViews.ShippingView
						})
					});

					var disclaimerView = new ListingViews.Section({
						model: new SectionModel({
							header: "Other Info",
							view: ListingViews.DisclaimerView
						})
					});

					layout.itemRegion.show(collectionView);
					layout.headerRegion.show(headerView);
					layout.shippingRegion.show(shippingView);
					layout.disclaimerRegion.show(disclaimerView);
				});

				return layout;
			},

			show: function () {
				var listingModel = new ListingModel();
				
				this.getLayoutView(listingModel);
			}
		});

	});


	return App.Preview.Controller;
});
