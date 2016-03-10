
var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
// var Listing = require('models/Listing');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.get('/', function(req, res, next) {
	res.render('index.ejs');
});

app.get('/listings', function (req, res, next) {
	res.json({
		itemName: "Marvel Run the Jewels Variant Pack",
		description: "You are bidding on a 2 book tribute to Run the Jewels variant set by Marvel.  This set includes: ",
		items: [
			{
				title: "Deadpool #45",
				thumbnail: "https://dl.dropboxusercontent.com/u/37888108/books/20150518_210743.jpg",
				imgLink: "https://dl.dropboxusercontent.com/u/37888108/books/20150518_210743.jpg"
			}, {
				title: "Howard the Duck #2",
				thumbnail: "https://dl.dropboxusercontent.com/u/37888108/books/20150518_210801.jpg",
				imgLink: "https://dl.dropboxusercontent.com/u/37888108/books/20150518_210801.jpg"
			}
		]
	});
});


app.use(express.static(path.join(__dirname, '../web')));

app.listen(3000);