class Layout{

    calcVariationValue(data){
        return "opa";
    }

    calcVariationVolume(data){
        return "calma";
    }

    pushMainTable(jsonData){
        var table = document.getElementById('mainTable');
        var tr = document.createElement('tr')
        var nameAction = document.createElement('td');
        var variationValue = document.createElement('td');
        var variationVolume = document.createElement('td');
        var lastCurrentValue = document.createElement('td');
        var lastDailyClose = document.createElement('td');

        nameAction.innerHTML = jsonData['Meta Data']['2. Symbol'];
        variationValue.innerHTML = this.calcVariationValue(jsonData['Time Series (5min)'])
        variationVolume.innerHTML = this.calcVariationVolume(jsonData['Time Series (5min)'])
        lastDailyClose.innerHTML = "teste";
        
        var last = 0 ;
        for (let i in jsonData['Time Series (5min)'])
            if (last == 0)
                lastCurrentValue.innerHTML = jsonData['Time Series (5min)'][i]['4. close'];
                
        

        tr.appendChild(nameAction);
        tr.appendChild(variationValue);
        tr.appendChild(variationVolume);
        tr.appendChild(lastCurrentValue);
        tr.appendChild(lastDailyClose);
        
        table.lastChild.insertBefore(tr,table.lastChild.lastChild)


    }
}

var layout = new Layout();
class ControllerData{
    

    constructor(){
        this.actionsReceived = []
    }

    async addActionOnList(index){
        
        if ( index != -1 ){
            var tr = document.getElementById("listSearch").childNodes[index];
            var inputCode = tr.childNodes[0].innerHTML;

            this.actionsReceived.push(await $.get("http://localhost:3000/stockExchange/query?symbol="+inputCode));
            layout.pushMainTable(this.actionsReceived[this.actionsReceived.length-1],this.actionsReceived.length-1)

        }
        else{

            this.actionsReceived.push(await $.get("http://localhost:3000/stockExchange/query?symbol=^BVSP"));    
            layout.pushMainTable(this.actionsReceived[this.actionsReceived.length-1],this.actionsReceived.length-1)

        }
    }

    async searchInput(){
        var inputCode =  document.getElementById('recipient-name').value;
        console.log(inputCode);
        if ( inputCode != '' && inputCode != 'ibovespa' && inputCode != 'IBOVESPA' ){
    
            var tr = document.createElement('tr');
            var symbol = document.createElement('th');
            var region = document.createElement('th');

            symbol.appendChild(document.createTextNode('Symbol'));
            region.appendChild(document.createTextNode('Region'));
            tr.appendChild(symbol);
            tr.appendChild(region);
    
            var input = document.getElementById('recipient-name');
            var button = document.getElementById('searchSub');
            
            input.style.visibility = 'hidden';
            button.style.visibility = 'hidden';
            
            input.style.display = 'none';          
            button.style.display = 'none';
            
            document.getElementById("listSearch").appendChild(tr);
            
            var jsonResult = await $.get('http://localhost:3000/stockExchange/search?inputCode='+inputCode);            
                
            // i+1 bring the right position  
            for (let i = 0 ; i < jsonResult['bestMatches'].length; i++ )
                this.layoutInfoTable(jsonResult['bestMatches'][i],i+1)

        }
        else{
            if (inputCode != 'ibovespa' || inputCode != 'IBOVESPA')
                this.addActionOnList(-1)
            
            else{
                alert('Entre com um nome');
                document.getElementById('recipient-name').focus();
            }
        }
    }
    
    layoutInfoTable(json,index){
        var tr = document.createElement('tr');
        var symbol = document.createElement('td');
        var region = document.createElement('td');

        symbol.setAttribute('onclick', "controllerData.addActionOnList("+index+");");

        symbol.appendChild(document.createTextNode(json['1. symbol']));
        region.appendChild(document.createTextNode(json['4. region']));
        tr.appendChild(symbol);
        tr.appendChild(region);

        document.getElementById("listSearch").appendChild(tr);

    }

    cleanSearchTable(){
        var table = document.getElementById('listSearch');
        if (table.childNodes.length > 0){
            table.innerHTML = "";
            while (table.firstChild)
                table.removeChild(table.firstChild);

            var input = document.getElementById('recipient-name');
            var button = document.getElementById('searchSub');
            
            input.style.visibility = 'visible';
            button.style.visibility = 'visible';

            input.style.display = '';
            button.style.display = '';
        }
    }

}