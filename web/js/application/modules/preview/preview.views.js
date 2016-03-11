define([
	'application'
], function (App) {
	App.module('Preview', function (Preview, App, Backbone, Marionette, $, _) {
		var Views = Preview.Views = {};

		/**
		*  The view being used as the template for the copying of the html.
		*  Includes the styles needed for the markup to render correctly
		**/
		Views.FullPage = Marionette.ItemView.extend({
			template: '#tpl-template',
			ui: {
				content: '.js-content'
			}
		});


		/**
		*	View that shows the preview and handles the copy
		**/
		Views.TabView = Marionette.LayoutView.extend({
			template: '#tpl-listing',
			className: 'row u-pad-v-20',
			events: {
				'click .js-copy-button': 'handleCopyClick'
			},
			ui: {
				copyTextarea: '.js-copy-textarea'
			},
			regions: {
				listingContainer: '.js-listing-container'
			},
			// the copy mechanism to is to have textarea that is not visible, and copy the contets
			handleCopyClick: function () {
				// create the full view and add in the preview
				var fullPage = new Views.FullPage();
				var listing = this.listingContainer.currentView.el.cloneNode(true);
				fullPage.render();
				fullPage.ui.content.append(listing.outerHTML);
				
				// update te contents of teh textarea and select everything within it
				this.ui.copyTextarea.val(fullPage.el.outerHTML);
				this.ui.copyTextarea.select();

				// attempt to copy the selection
				document.execCommand('copy');

				// clean up
				fullPage.destroy();
				this.ui.copyTextarea.val('');
			}
		});

		Views.Layout = Marionette.LayoutView.extend({
			template: '#tpl-listing-layout',
			className: 'row bordered',
			regions: {
				headerRegion: ".header-section-container",
				descriptionRegion: ".item-description-section-container",
				itemRegion: ".item-collection-container",
				shippingRegion: ".shipping-container",
				disclaimerRegion: ".disclaimer-section-container"
			},
			modelEvents: {
				'change': 'render'
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

	return App.Preview.Views;
});
