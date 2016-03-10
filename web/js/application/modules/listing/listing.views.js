define([
	'application'
], function (App) {
	App.module('Listing', function (Listing, App, Backbone, Marionette, $, _) {
		var Views = Listing.Views = {};

		Views.Layout = Marionette.LayoutView.extend({
			template: '#tpl-listing-layout',
			regions: {
				headerRegion: ".header-section-container",
				descriptionRegion: ".item-description-section-container",
				itemRegion: ".item-collection-container",
				shippingRegion: ".shipping-container",
				disclaimerRegion: ".disclaimer-section-container"
			}
		});

		Views.Section = Marionette.ItemView.extend({
			template: '#tpl-section',
			className: "section",
			ui: {
				content: ".section-content"
			},
			onRender: function () {
				var contentViewType = this.model.get("view") || Views.Basic;
				var contentView = new contentViewType({model: this.model.get("viewModel")})

				this.ui.content.html(contentView.render().el);
			}
		});

		Views.ListingHeader = Marionette.ItemView.extend({
			template: '#tpl-listing-header',
			className: "row"
		});

		Views.Basic = Marionette.ItemView.extend({
			template: false
		});

		Views.ShippingView = Marionette.ItemView.extend({
			template: '#tpl-shipping'
		})

		Views.DisclaimerView = Marionette.ItemView.extend({
			template: '#tpl-disclaimer',
			className: "well"
		});

		Views.Item =  Marionette.ItemView.extend({
			template: '#tpl-item',
			className: "col-xs-12 col-md-6 col-lg-3 item",
			initialize: function (opts) {				
				opts = opts || {};

				this.model.set({
					itemNumber: opts.childIndex + 1
				});
			}
		});

		Views.ItemCollection = Marionette.CollectionView.extend({
			childView: Views.Item,
			childViewOptions: function(model, index) {
				return {
					childIndex: index
				};
			},
			initialize: function () {
				this.collection = this.model.get("collection");
			}
		});
	});

	return App.Listing.Views;
});
