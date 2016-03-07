define([
	'backbone'
], function (Backbone) {
	var ProductModel = Backbone.Model.extend({
		defaults: {
			title: '',
			description: '',
			imageLink: ''
		}
	});

	return ProductModel;
});