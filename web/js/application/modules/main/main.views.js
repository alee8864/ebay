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
				listingPreviewRegion: '#listing-preview',
				listingCodeRegion: '#listing-code'
			}
		});



		Main.Views = Views;
	});

	return App.Main.Views;
});