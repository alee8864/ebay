define([
	'application',
	'models/productModel',
	'models/productCollection',
	'fileupload'
], function (App, ProductModel, ProductCollection) {

	App.module('ListingForm', function (ListingForm, App, Backbone, Marionette, $, _) {
		var Views = {};

		Views.ProductEditView = Marionette.ItemView.extend({
			template: '#tpl-listting-form-product-create',
			className: 'product col-xs-12',
			ui: {
				'title': '#new-product-title',
				'description': '#new-product-description',
				'imageLink': '#new-product-image-link',
				'thumbnailLink': '#new-product-thumbnail-link',
				'image': '.js-product-image',
				'upload': '.js-new-product-upload'
			},
			events: {
				'change input': 'handleInputChange'
			},
			modelEvents: {
				'change': 'render'
			},
			triggers: {
				'click .js-close': 'remove'
			},
			initialize: function (options) {
				this.index = options.index;
				this.imageLoadErrorCount = 0;
				_.bindAll(this, 'handleUploadCompleted', 'handleImageError');
			},
			onRender: function () {
				this.$el.toggleClass('even', this.index % 2 === 0)
				this.ui.image.toggle(this.model.get('image_link') !== '');

				this.ui.upload.fileupload({
					url: '/upload',
					dataType: 'json',
					done: this.handleUploadCompleted
				});


				this.ui.image[0].onerror = this.handleImageError;
			},
			handleUploadCompleted: function (evt, data) {
				var filename = data.files[0].name;
				var bucketPath = 'https://s3-us-west-1.amazonaws.com/listing-generator/open/'

				this.model.set({
					image_link: bucketPath + filename,
					thumbnail_link: bucketPath + 'thumbs/' + filename
				});
			},
			handleInputChange: function (evt) {
				
				if (this.ui.upload[0].files.length) {
					this.uploadImage();
				}

				this.model.set({
					title: this.ui.title.val(),
					description: this.ui.description.val(),
					thumbnail_link: this.ui.thumbnailLink.val(),
					image_link: this.ui.imageLink.val()
				});

				this.trigger('modelChange');
			},
			handleImageError: function () {
				var that = this;
				var src = this.ui.image.attr('src');
				if (src && this.imageLoadErrorCount < 5) {
					window.setTimeout(function () {
						that.imageLoadErrorCount++;
						that.render();
					}, 1000);
				} else if (this.imageLoadErrorCount >= 5) {
					this.ui.image.attr('src', 'images/image-not-available.png');
				}

			}
		});

		Views.ProductListView = Marionette.CompositeView.extend({
			template: '#tpl-listing-form-product-list',
			childViewContainer: '.js-products-container',
			className: 'col-xs-12',
			ui: {
				'addProduct': '.js-create-form-container'
			},
			events: {
				'click .js-add-product': 'handleAddProductClick'
			},
			childEvents: {
				'modelChange': 'childModelChange',
				'remove': 'handleRemoveChild'
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
			},
			handleRemoveChild: function (childView) {
				this.collection.remove(childView.model);
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

				this.model.save(null, {
					success: function (model, response, options) {
						Backbone.history.navigate(model.id, {trigger: true});
					}
				});
			}

		});

		ListingForm.Views = Views;
	});

	return App.ListingForm.Views;
});