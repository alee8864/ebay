
define([
	'backbone'
], function (Backbone) {

	var models = {};

	models.SectionModel = Backbone.Model.extend({
		defaults: {
			header: "",
			view: null,
			viewModel: null
		}
	});


	return models;
});
