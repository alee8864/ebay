define([
	'backbone',
	'models/productModel'
], function (Backbone, ProductModel) {
	var ProductCollection = Backbone.Collection.extend({
		model: ProductModel
	});

	return ProductCollection;
});