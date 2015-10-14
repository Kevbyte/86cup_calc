var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/86cup');

app.set('port', (process.env.PORT || 4040));

app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));

require('./routes/routes.js')(app);

app.use(express.static('client'));


var server = app.listen(app.get('port'), function() {
  console.log("Listening on " + app.get('port'));
});

module.exports = app;