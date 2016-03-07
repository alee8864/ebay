
var express = require('express');
var path = require('path');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res, next) {
	res.render('index.ejs');
});

app.use(express.static(path.join(__dirname, '../web')));

app.listen(3000);