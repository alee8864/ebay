define([
	'backbone'
], function (Backbone) {
	var ProductModel = Backbone.Model.extend({
		defaults: {
			title: '',
			description: '',
			image_link: ''
		}
	});

	return ProductModel;
});