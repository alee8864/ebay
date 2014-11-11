application.module("Listing", function (mod, app, bb, m, $, _) {
	mod.Controller = Marionette.Controller.extend({
		show: function (listing) {
			var layout = new mod.Views.layout();

			app.mainRegion.show(layout);

			var itemFetch = app.request	("listing:items", listing);



			$.when(itemFetch).done(function (listing) {

				var headerSectionViewModel = new bb.Model({
				});

				var headerSectionModel = new models.SectionModel({
					title: "",
					view: "",
					viewModel: headerSectionViewModel
				});

				var headerView = new mod.Views.section({
					model: headerSectionModel
				});

				layout.headerRegion.show(headerView);

				var collectionView = new mod.Views.itemCollection({
					collection: listing.get("items")
				});

				layout.itemRegion.show(collectionView);
			});


			var shippingSectionViewModel = new models.SectionModel({
				header: "",
				view: ""
			});

			var shippingView = new mod.Views.section({
				model: shippingSectionViewModel
			});

			layout.shippingRegion.show(shippingView);


			var disclaimerViewModel = new models.SectionModel({

			});

			var disclaimerView = new models.section({
				model: disclaimerViewModel
			});

			layout.disclaimerRegion.show(disclaimerView);
		}
	});
});