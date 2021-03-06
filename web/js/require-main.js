'use strict';

require.config({
	paths: {
		'jquery':     'vendor/jquery-2.1.1.min',
		'underscore': 'vendor/underscore-min',
		'backbone':   'vendor/backbone-min',
		'marionette': 'vendor/backbone.marionette',
		'bootstrap': 'vendor/bootstrap.min',
		'application': 'application/application',
		'modules': 'application/modules',
		'templates': 'application/templates',
		'models': 'application/models',
		'fileupload': 'vendor/jquery.fileupload',
		'jquery.ui.widget': 'vendor/jquery.ui.widget'
	},
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		marionette: {
			deps: ['backbone'],
			exports: 'Marionette'
		},
		bootstrap: {
			deps: ['jquery']
		},
		utils: {
			deps: ['jquery']
		},
		emailValidation: {
			deps: ['jquery']
		}
	}
});

require([
	'application',
	'underscore',
	'bootstrap',
	'modules/main/main',
	'modules/preview/preview'
], function (Application, _) {

	_.templateSettings = {
		evaluate:    /\{\{(.+?)\}\}/g,
		interpolate: /\{\{=(.+?)\}\}/g,
		escape:      /\{\{-(.+?)\}\}/g
	};


	Application.start();
});