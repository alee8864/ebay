define([
	'backbone',
	'models/productCollection'
], function (Backbone, ProductCollection) {
	var ListingModel = Backbone.Model.extend({
		url: 'listings',
		defaults: {
			title: '',
			description: '',
			products: null
		},
		initialize: function () {
			this.set({
				products: new ProductCollection()
			});
		},
		parse: function (obj) {
			var attrs = obj;

			attrs.products = new ProductCollection(obj.items)

			return attrs;
		}
	});

	return ListingModel;
});