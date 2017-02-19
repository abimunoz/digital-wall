var express = require('express');
var mongo = require('mongodb').MongoClient;
var hbs = require('express-handlebars');
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/PROJECT2';
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var objectId = require('mongodb').ObjectID;
var favicon = require('serve-favicon');


var app = express();


  ////////////////
 // MIDDLEWARE //
////////////////
app.use(morgan('dev'));
app.use(favicon(__dirname + '/public/dinosaur.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
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
    db.collection('data').insertOne(task, function(err, result) {
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
    db.collection('data').find({}).toArray(function(err, items){
      db.close();
      res.render('index', {posts: items});
    });
  });
});


  ////////////////
 //   DELETE   //
////////////////
app.post('/delete/:id', function(req, res, next) {
  mongo.connect(url, function(err, db) {
    var id = req.params.id;
    db.collection('data').deleteOne({"_id": objectId(id)}, function(err, result) {
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
 mongo.connect(url, function(err, db) {
  var id = req.body.oid;
  var content = {description: req.body.description};
   db.collection('data').updateOne({"_id": objectId(id)}, {$set: content}, function(err, result) {
     console.log('Item updated');
     db.close();
     res.json(result);
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
