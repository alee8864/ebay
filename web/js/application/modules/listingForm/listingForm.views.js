define([
	'application',
	'models/productModel',
	'models/productCollection'
], function (App, ProductModel, ProductCollection) {

	App.module('ListingForm', function (ListingForm, App, Backbone, Marionette, $, _) {
		var Views = {};

		Views.ProductEditView = Marionette.ItemView.extend({
			template: '#tpl-listting-form-product-create',
			className: 'product',
			ui: {
				'title': '#new-product-title',
				'description': '#new-product-description',
				'imageLink': '#new-product-image-link',
				'image': '.js-product-image'
			},
			events: {
				'change input': 'handleInputChange'
			},
			modelEvents: {
				'change': 'render'
			},
			triggers: {
				'click .js-btn-add': 'add'
			},
			initialize: function (options) {
				this.index = options.index;
			},
			onRender: function () {
				this.$el.toggleClass('even', this.index % 2 === 0)
				this.ui.image.toggle(this.model.get('image_link') !== '');
			},
			handleInputChange: function () {
				this.model.set({
					title: this.ui.title.val(),
					description: this.ui.description.val(),
					image_link: this.ui.imageLink.val()
				});

				this.trigger('modelChange');
			}
		});

		Views.ProductView = Marionette.ItemView.extend({
			template: '#tpl-listng-form-product-list-item'
		});

		Views.ProductListEmptyView = Marionette.ItemView.extend({
			template: false,
			className: 'listing-form-empty',
			onRender: function () {
				this.$el.text("Add a Product");
			}
		});

		Views.ProductListView = Marionette.CompositeView.extend({
			template: '#tpl-listing-form-product-list',
			childView: Views.ProductView,
			childViewContainer: '.js-products-container',
			emptyView: Views.ProductListEmptyView,
			className: 'col-xs-12',
			ui: {
				'addProduct': '.js-create-form-container'
			},
			events: {
				'click .js-add-product': 'handleAddProductClick'
			},
			childEvents: {
				'modelChange': 'childModelChange'
			},
			childView: Views.ProductEditView,
			childViewOptions: function(model, index) {
				return {
					index: index
				};
			},
			initialize: function () {
				this.model = this.options.model;
			},
			handleAddProductClick: function () {
				var productModel = new ProductModel();

				this.collection.add(productModel);
			},
			childModelChange: function () {
				this.model.trigger('change');
			}
		});


		Views.FormItemView = Marionette.ItemView.extend({
			template: '#tpl-listing-form-form',
			className: 'row',
			ui: {
				'productContainer': '.js-product-container',
				'headerInput': '#listing-header',
				'descriptionInput': '#listing-description'
			},
			events: {
				'change input': 'handleInputChange',
				'submit': 'handleSubmit'
			},
			initialize: function () {
				this.productListView = new Views.ProductListView({
					model: this.model,
					collection: this.model.get("products")
				});
			},
			onRender: function () {
				this.ui.productContainer.append(this.productListView.render().el);
			},
			handleInputChange: function () {
				this.model.set({
					title: this.ui.headerInput.val(),
					description: this.ui.descriptionInput.val()
				});
			},
			handleSubmit: function (evt) {
				evt.preventDefault();

				this.model.save();
			}

		});

		ListingForm.Views = Views;
	});

	return App.ListingForm.Views;
});