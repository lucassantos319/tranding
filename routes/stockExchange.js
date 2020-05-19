var data = require('d:/programas/tranding/public/javascripts/importData');
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var importD = new data();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('stockExchange', { title: 'Stock Exchange Table'});   
});

// Resposta com o Json 
router.get('/search', async function(req, res, next) {
  res.json(await importD.searchSymbol(req.query.inputCode));
});

router.get('/query',async function(req,res,next){
  res.json(await importD.queryData(req.query.symbol));
});

module.exports = router;
