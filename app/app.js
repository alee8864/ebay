
var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require("config");
var defaultRoutes = require("./routes/default");
var listingRoutes = require("./routes/listings");

mongoose.connect(config.get("mongo").url);

mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ', config.get("mongo").url);
}); 

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

defaultRoutes(app);
listingRoutes(app);

app.use(express.static(path.join(__dirname, '../web')));

app.listen(process.env.PORT || 5000);

module.exports = app;