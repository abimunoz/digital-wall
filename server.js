var express = require('express');
var mongo = require('mongodb').MongoClient;
var hbs = require('express-handlebars');
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/PROJECT2';
var bodyParser = require('body-parser');
var logger = require('morgan');
// var assert = require('assert');
var path = require('path');
var objectId = require('mongodb').ObjectID;



var app = express();


  ////////////////
 // MIDDLEWARE //
////////////////
// app.use(morgan('dev'));
// app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/views'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
// app.set('view engine', 'hbs');

//view engine set-up
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts/'}));
// server .hbs templates from views with res.render
app.set('views', path.join(__dirname, 'views'));
// Use Handlebars syntax {{ }}
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


  ////////////////
 //   CREATE   //
////////////////
app.post('/create', function(req, res, next) {
  console.log(req.body)
  var task = {
    description : req.body.description,
    isDone : false,
    createdAt: new Date()
  };

  mongo.connect(url, function(err, db){
    // assert.equal(null, err);
    db.collection('data').insertOne(task, function(err, result) {
      // assert.equal(null, err);
      console.log('Item inserted');
      db.close();
      res.json(result);
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
 //    PORT    //
////////////////
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Listening on' + port);
});
