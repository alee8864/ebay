var Promise = require('bluebird');
var upload = require('jquery-file-upload-middleware');
var path = require('path');
var AWS = require('aws-sdk');
var file = require('file-system');
var fs = Promise.promisifyAll(require('fs'));

module.exports = function (app) {

	var s3 = new AWS.S3({params: {Bucket: 'listing-generator'}});
	var s3PutObject = Promise.promisify(s3.putObject, {context: s3});

	upload.configure({
		uploadDir: path.join(__dirname, '../public/uploads/'),
		uploadUrl: '/uploads',
		imageVersions: {
			thumbnail: {
				width: 350,
				height: 350
			}
		}
	});

	upload.on('end', function (fileInfo, req, res) {

		var name = fileInfo.name;
		var imagePath = path.join(__dirname, '../public/uploads/', name);
		var thumbPath = path.join(__dirname, '../public/uploads/thumbnail/', name);

		var uploadFullImage = fs.readFileAsync(imagePath)
				.then(function (img) {
					return s3PutObject({
						Key: 'open/' + fileInfo.name,
						Body: img,
						ContentType: 'image',
						ACL: 'public-read'
					});
				})
				.then(function (s3result) {
					return fs.unlinkSync(imagePath);
				})
				.catch(function(err) {
					console.log('error', err)
				});

		var uploadThumbImage = fs.readFileAsync(thumbPath)
				.then(function (img) {
					return s3PutObject({
						Key: 'open/thumbs/' + fileInfo.name,
						Body: img,
						ContentType: 'image',
						ACL: 'public-read'
					});
				})
				.then(function (s3result) {
					return fs.unlinkSync(thumbPath);
				})
				.catch(function(err) {
					console.log('error', err)
				});
		
		Promise.all([uploadFullImage, uploadThumbImage])
			.catch(function (err) {
				console.log('error', err);
			})
			.done();
	});


	app.route('/upload')
	.post(function (req, res, next) {
		upload.fileHandler()(req, res, next);
	});
};