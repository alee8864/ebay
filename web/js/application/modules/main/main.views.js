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