define([
	'application'
], function (App, tpl) {

	App.module('Main', function (Main, App, Backbone, Marionette, $, _) {
		var Views = {};
		Views.PageLayout = Marionette.LayoutView.extend({
			template: '#tpl-main-page-layout',
			regions: {
				'formRegion': '.js-listing-form-container',
				'outputRegion': '.js-output-container'
			}
		});

		Views.TabListItemView = Marionette.ItemView.extend({

		});

		Views.TabListCollectionView = Marionette.CollectionView.extend({
			tagName: 'ul',
			className: 'nav nav-tabs',
			attributes: {
				role: 'tablist'
			},
			childView: Views.TabListItemView
		});

		Views.TabContentItemView = Marionette.ItemView.extend({

		});

		Views.TabContentCollectionView = Marionette.CollectionView.extend({
			className: 'tab-content',
			childView: Views.TabContentItemView
		});

		Views.TabWrapper = Marionette.ItemView.extend({
			template: false,
			initialize: function () {
				this.tabListView = new Views.TabListCollectionView({
					collection: this.model.get('tabListCollection')
				});
				this.tabContentView = new Views.TabContentCollectionView({
					collection: this.model.get('tabContentCollection')
				});
			},
			onRender: function () {
				this.$el.empty();

				this.$el.append(this.tabListView.render().$el);
				this.$el.append(this.tabContentView.render().$el);
			}
		});

		Views.TabView = Marionette.LayoutView.extend({
			template: '#tpl-tab-view',
			regions: {
				listingFormRegion: '#listing-form',
				listingPreviewRegion: '#listing-preview'
			}
		});



		Main.Views = Views;
	});

	return App.Main.Views;
});