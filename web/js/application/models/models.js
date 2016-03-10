
define([
	'backbone'
], function (Backbone) {

	var models = {};

	models.ItemModel = Backbone.Model.extend({
		defaults: {
			title: "",
			thumbnail: "",
			imgLink: ""
		}
	});

	models.ItemCollection = Backbone.Collection.extend({
		model: models.ItemModel
	});

	models.ListingModel = Backbone.Model.extend({
		defaults: {
			itemName: "",
			description: "",
			items: null
		},
		parse: function (obj) {
			var attrs = obj;

			attrs.items = new models.ItemCollection(obj.items)

			return attrs;
		}
	});

	models.SectionModel = Backbone.Model.extend({
		defaults: {
			header: "",
			view: null,
			viewModel: null
		}
	});


	return models;
});
