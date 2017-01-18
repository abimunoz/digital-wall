var express = require('express');
// var mongo = require('mongodb').MongoClient;
var hbs = require('hbs');
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/sandbox';


var app = express();
//
//
//   ////////////////
//  // MIDDLEWARE //
// ////////////////
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
// app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'hbs');
//
//
//   ////////////////
//  //   CREATE   //
// ////////////////
app.get('/', function(request, response, next) {
  response.render('index');
});

//
//   ////////////////
//  //    PORT    //
// ////////////////
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Listening on' + port);
});
