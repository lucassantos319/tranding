// var request = require('request');
const axios = require('axios');
const apiKey = 'SGHCA57REDAP826B';
var link = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBOV11.SAO&interval=1min&apikey=SGHCA57REDAP826B'

// var searchLink = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=IBOV&apikey='+apiKey;

async function queryData() {
  const query = await axios.get(link);
  console.log(query.data);
};

queryData();