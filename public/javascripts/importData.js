// 
// Config query

const axios = require('axios');
const funct = 'TIME_SERIES_INTRADAY';
const functSearch = 'SYMBOL_SEARCH' ;
const symbol = 'PETR4.SAO';
const apiKey = 'SGHCA57REDAP826B';
const interval = '5min';


class importData {
    constructor(){
        this.link = 'https://www.alphavantage.co/query?function='
                    +funct+'&symbol='+symbol+'&interval='+interval+'&apikey='+apiKey ; 
    
        this.searchLink = '';
    }
    
    async queryData() {
        const query = await axios.get(this.link);
        return query.data;
    };
 
    async filterData(){
        const query = await axios.get(this.link);
        return query.data['Time Series (1min)'];
    };

    async searchSymbol(inputCode){
        console.log(inputCode);
        this.searchLink = 'https://www.alphavantage.co/query?function='+
                            functSearch+'&keywords='+inputCode+'&apikey='+apiKey;

        console.log(this.searchLink);
        const query = await axios.get(this.searchLink);
        return query.data;       
    };
    
}    

module.exports = importData;
