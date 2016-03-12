define([
	'backbone',
	'models/productCollection'
], function (Backbone, ProductCollection) {
	var ListingModel = Backbone.Model.extend({
		urlRoot: 'listings',
		idAttribute: '_id',
		defaults: {
			title: '',
			description: '',
			products: null
		},
		initialize: function (opts) {
			this.set({
				products: new ProductCollection()
			});
		},
		parse: function (obj) {
			var attrs = obj;

			attrs.products = new ProductCollection(obj.products);

			return attrs;
		}
	});

	return ListingModel;
});