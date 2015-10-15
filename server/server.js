var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var uriUtil = require('mongodb-uri');

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };       
 
/*
 * Mongoose uses a different connection string format than MongoDB's standard.
 * Use the mongodb-uri library to help you convert from the standard format to
 * Mongoose's format.
 */
var mongodbUri = 'mongodb://heroku_067m5c1d:gqdu4n5htok8tuvia3manvnok6@ds039624-a0.mongolab.com:39624,ds039624-a1.mongolab.com:39624/heroku_067m5c1d?replicaSet=rs-ds039624';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

mongoose.connect(mongooseUri, options);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

// mongoose.connect('mongodb://localhost/86cup');

app.set('port', (process.env.PORT || 4040));

app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));

require('./routes/routes.js')(app);

app.use(express.static('client'));


var server = app.listen(app.get('port'), function() {
  console.log("Listening on " + app.get('port'));
});

module.exports = app;