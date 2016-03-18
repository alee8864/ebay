define([
	'backbone'
], function (Backbone) {
	var ProductModel = Backbone.Model.extend({
		defaults: {
			title: '',
			description: '',
			thumbnail_link: '',
			image_link: ''
		}
	});

	return ProductModel;
});