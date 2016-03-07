application.module("Listing", function (mod, app, bb, m, $, _) {
	mod.Views = {};

	mod.Views.layout = m.LayoutView.extend({
		template: require('../../templates/listingLayout.hbs'),
		regions: {
			headerRegion: ".header-section-container",
			descriptionRegion: ".item-description-section-container",
			itemRegion: ".item-collection-container",
			shippingRegion: ".shipping-container",
			disclaimerRegion: ".disclaimer-section-container"
		}
	});

	mod.Views.section = m.ItemView.extend({
		template: require('section.hbs'),
		className: "section",
		ui: {
			content: ".section-content"
		},
		onRender: function () {
			var contentViewType = this.model.get("view") || mod.Views.basic;
			var contentView = new contentViewType({model: this.model.get("viewModel")})

			this.ui.content.html(contentView.render().el);
		}
	});

	mod.Views.listingHeader = m.ItemView.extend({
		template: require('listingHeader.hbs'),
		className: "row"
	});

	mod.Views.basic = m.ItemView.extend({
		template: false
	});

	mod.Views.shippingView = m.ItemView.extend({
		template: require('shipping.hbs')
	})

	mod.Views.disclaimerView = m.ItemView.extend({
		template: require('disclaimer'),
		className: "well"
	});

	mod.Views.item =  m.ItemView.extend({
		template: require('item.hbs'),
		className: "col-xs-12 col-md-6 col-lg-3 item",
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
		},
		initialize: function () {
			this.collection = this.model.get("collection");
		}
	});

});