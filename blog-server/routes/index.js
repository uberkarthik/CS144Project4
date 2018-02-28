var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var commonmark = require('commonmark');
var reader = new commonmark.Parser();
var writer = new commonmark.HtmlRenderer();

var url = 'mongodb://localhost:27017';
const dbName = 'Blogserver';

/* GET home page. */

router.get('/', function(req, res, next) 
{
  mongo.connect(url, function(err, db)
  {
    assert.equal(null, err);
  });
  res.render('login', { title: 'Express' });
});


/* GET username with postid */

router.get('/blog/:username/:postid', function(req, res, next) 
{
  var results = [];
  mongo.connect(url, function(err, client) 
  {
    assert.equal(null, err);
    const db = client.db(dbName);
    var temp = parseInt(req.params.postid);
    var cursor = db.collection('Posts').find( { $and: [ { postid: temp } , { username: req.params.username } ] } );
    cursor.forEach(function(doc, err)
    {
      assert.equal(null, err);
      var parsed = reader.parse(doc.title);
      var answer = writer.render(parsed);
      doc.title = answer;
      results.push(doc);
    }, function() 
    { 
      res.render('index', { Posts: results, title: 'Express' });
    });
  });
}, function () 
{
  results = {};
});

/* GET username with 5 posts per page WITH starting postid*/

router.get('/blog/:username/:start?', function(req, res, next)
{
  var results = [];
  mongo.connect(url, function(err, client)
  {
    assert.equal(null, err);
    const db = client.db(dbName);
    var temp = parseInt(req.query.start);
    var cursor;
    if (req.query.start != null)
      cursor = db.collection('Posts').find( { $and: [ { postid: { $gte: temp } } , { username: req.params.username } ] } );
    else
      cursor = db.collection('Posts').find( { username: req.params.username } );
    cursor.forEach(function(doc, err)
    {
      assert.equal(null, err);
      var tempTitle = doc.title;
      var parsed = reader.parse(tempTitle);
      var answer = writer.render(parsed);
      doc.title = answer;
      results.push(doc);
    }, function()
    {
      res.render('index', { Posts: results, title: 'Express' });
    });
  });
}, function ()
{
  results = {};
});

module.exports = router;
