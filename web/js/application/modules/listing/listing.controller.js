application.module("Listing", function (mod, app, bb, m, $, _) {
	mod.Controller = Marionette.Controller.extend({
		show: function (listing) {
			var layout = new mod.Views.layout();

			app.mainRegion.show(layout);

			var itemFetch = app.request("listing:items", listing);

			$.when(itemFetch).done(function (listing) {
				var headerSectionModel = new models.SectionModel({
					view: mod.Views.listingHeader,
					viewModel: listing
				});

				var headerView = new mod.Views.section({
					model: headerSectionModel
				});

				layout.headerRegion.show(headerView);

				var itemSectionViewModel = new bb.Model({
					collection: listing.get("items")
				});

				var itemSectionModel = new models.SectionModel({
					header: "Auctioned Items",
					viewModel: itemSectionViewModel,
					view: mod.Views.itemCollection
				});

				var collectionView = new mod.Views.section({
					model: itemSectionModel
				});

				layout.itemRegion.show(collectionView);
			});

			var shippingSectionViewModel = new models.SectionModel({
				header: "Shipping info",
				view: mod.Views.shippingView
			});

			var shippingView = new mod.Views.section({
				model: shippingSectionViewModel
			});

			layout.shippingRegion.show(shippingView);

			var disclaimerViewModel = new models.SectionModel({
				header: "Other Info",
				view: mod.Views.disclaimerView
			});

			var disclaimerView = new mod.Views.section({
				model: disclaimerViewModel
			});

			layout.disclaimerRegion.show(disclaimerView);
		}
	});
});