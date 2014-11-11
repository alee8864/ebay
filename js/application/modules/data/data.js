application.module("Data", function (mod, app, bb, m, $, _) {
	var API = {
		getItems: function (listing) {
			var obj = data[listing];

			return new models.ListingModel(obj, {parse: true});
		}
	}

	application.reqres.setHandler("listing:items", function (listing) {
		return API.getItems(listing);
	})
}); 