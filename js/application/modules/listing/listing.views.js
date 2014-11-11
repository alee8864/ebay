application.module("Listing", function (mod, app, bb, m, $, _) {
	mod.Views = {};

	mod.Views.layout = m.LayoutView.extend({
		template: "#tpl-listing-layout",
		regions: {
			headerRegion: ".header-section-container",
			descriptionRegion: ".item-description-section-container",
			itemRegion: ".item-collection-container",
			shippingRegion: ".shipping-container",
			disclaimerRegion: ".disclaimer-section-container"
		}
	});

	mod.Views.section = m.ItemView.extend({
		template: "#tpl-section",
		ui: {
			content: ".section-content"
		},
		onRender: function () {
			var contentViewType = this.model.get("view");
			var contentView = new contentViewType({model: this.model.get("viewModel")})
		}
	});

	mod.Views.item =  m.ItemView.extend({
		template: "#tpl-item",
		initialize: function (opts) {				
			opts = opts || {};

			this.model.set({
				itemNumber: opts.childIndex + 1
			});
		}
	});

	mod.Views.itemCollection = m.CollectionView.extend({
		childView: mod.Views.item,
		childViewOptions: function(model, index) {
			return {
				childIndex: index
			};
		}
	});

});