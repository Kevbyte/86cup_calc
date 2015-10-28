var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var uriUtil = require('mongodb-uri');
var aws = require('aws-sdk');
var dotenv = require('dotenv');
var favicon = require('serve-favicon');
dotenv.load();

var app = express();
var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/86cup';

// var mongodbUri = 'mongodb://heroku_067m5c1d:gqdu4n5htok8tuvia3manvnok6@ds039624-a0.mongolab.com:39624,ds039624-a1.mongolab.com:39624/heroku_067m5c1d?replicaSet=rs-ds039624';
// var mongooseUri = uriUtil.formatMongoose(mongodbUri);

 mongoose.connect(uristring, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
      }
    });

// if(process.env.MONGOLAB_URI) {
//   mongoose.connect(mongooseUri, options);
// }else{
//   mongoose.connect('mongodb://localhost/86cup');
// }

// var db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));



app.set('port', (process.env.PORT || 4040));

app.use(bodyParser.urlencoded({extended: true, limit: '500mb'}));
app.use(bodyParser.json({limit: '500mb'}));

require('./routes/routes.js')(app);

app.use(express.static('client'));
app.use(favicon('./client/myIcon.ico'));

var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID;
var AWS_SECRET_KEY = process.envAWS_SECRET_ACCESS_KEY;
var S3_BUCKET = process.env.S3_BUCKET_NAME;


var server = app.listen(app.get('port'), function() {
  console.log("Listening on " + app.get('port'));
});

app.get('/sign_s3', function(req, res){
    aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
    var s3 = new aws.S3();
    var s3_params = {
        Bucket: S3_BUCKET,
        Key: req.query.file_name,
        Expires: 60,
        ContentType: req.query.file_type,
        ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3_params, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            var return_data = {
                signed_request: data,
                url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.file_name
            };
            res.write(JSON.stringify(return_data));
            res.end();
        }
    });
});

module.exports = app;