
define([
	'backbone'
], function (Backbone) {

	var SectionModel = Backbone.Model.extend({
		defaults: {
			header: "",
			view: null,
			viewModel: null
		}
	});


	return SectionModel;
});
