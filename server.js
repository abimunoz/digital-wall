var express = require('express');
var mongo = require('mongodb').MongoClient;
var hbs = require('express-handlebars');
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/PROJECT2';
var bodyParser = require('body-parser');
var morgan = require('morgan');
// var assert = require('assert');
var path = require('path');
var objectId = require('mongodb').ObjectID;
var favicon = require('serve-favicon');
// var bootstrap = require('bootstrap');



var app = express();


  ////////////////
 // MIDDLEWARE //
////////////////
app.use(morgan('dev'));
app.use(favicon(__dirname + '/public/dinosaur.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//view engine set-up
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts/'}));
// server .hbs templates from views with res.render
app.set('views', path.join(__dirname, 'views'));
// Use Handlebars syntax {{ }}
app.set('view engine', 'hbs');



  ////////////////
 //   CREATE   //
////////////////
app.post('/create', function(req, res, next) {
  console.log ('this is the post request')
  console.log(req.body)
  var task = {
    description : req.body.description,
    createdAt: new Date()
  };

  mongo.connect(url, function(err, db){
    // assert.equal(null, err);
    db.collection('data').insertOne(task, function(err, result) {
      // assert.equal(null, err);
      console.log('Item inserted', result.insertedId);
      db.close();
      res.json(result.insertedId);
    })
  });
});



  ////////////////
 //    READ    //
////////////////
app.get('/', function(req, res, next) {
  mongo.connect(url, function(err, db) {
    // assert.equal(null, err);
    db.collection('data').find({}).toArray(function(err, items){
      // assert.equal(null, err);
      db.close();
      res.render('index', {todos: items});
    });
  });
});



  ////////////////
 //   DELETE   //
////////////////
app.post('/delete/:id', function(req, res, next) {
  mongo.connect(url, function(err, db) {
    var id = req.params.id;
    // assert.equal(null, err);
    db.collection('data').deleteOne({"_id": objectId(id)}, function(err, result) {
      // assert.equal(null, err);
      console.log("Item deleted: " + id);
      db.close();
      res.redirect('/');
    });
  });
});

  ////////////////
 //   UPDATE   //
////////////////
app.post('/update', function(req, res, next) {
  var task = {
    description : req.body.description,
    createdAt: new Date()
  };

 var id = req.body.id;

 mongo.connect(url, function(err, db) {
  //  assert.equal(null, err);
   db.collection('data').updateOne({"_id": objectId(id)}, {$set: task}, function(err, result) {
    //  assert.equal(null, err);
     console.log('Item updated');
     db.close();
     res.redirect('/');
   });
 });
});


  ////////////////
 //    PORT    //
////////////////
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Listening on' + port);
});
