
var data = require('d:/programas/tranding/public/javascripts/importData');
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var importD = new data();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home'});   
});

module.exports = router;
