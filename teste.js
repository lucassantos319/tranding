var request = require('request');
var api_Key = 'SGHCA57REDAP826B';

var link = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=PETR4.SAO&interval=1min&apikey=SGHCA57REDAP826B'
var json ;

var searchLink = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=PETR4&apikey=api_Key'

// const request = require('request');
request(link, function (error, response, body) {
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});
// json = request(link,(err,))
