define([
	'backbone'
], function (Backbone) {
	var ListingModel = Backbone.Model.extend({
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

	return ListingModel;
});