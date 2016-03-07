var bb = Backbone;

models = {};

models.ItemModel = bb.Model.extend({
	defaults: {
		title: "",
		thumbnail: "",
		imgLink: ""
	}
});

models.ItemCollection = bb.Collection.extend({
	model: models.ItemModel
});

models.ListingModel = bb.Model.extend({
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

models.SectionModel = bb.Model.extend({
	defaults: {
		header: "",
		view: null,
		viewModel: null
	}
});