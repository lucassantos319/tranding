var layout = require("d:/programas/tranding/public/javascripts/layout");

class ControllerData{
    
    constructor(){
        this.actionsReseave = []
    }

    async addActionOnList(index){
        
        var tr = document.getElementById("listSearch").childNodes[index];
        var inputCode = tr.childNodes[0].innerHTML;
        this.actionsReseave.push(await $.get("http://localhost:3000/stockExchange/query?symbol="+inputCode));

        layout.pushMainTable(this.actionsReseave[this.actionsReseave.length])
    }

    async searchInput(){
        var inputCode =  document.getElementById('recipient-name').value;
        if ( inputCode != '' ){
    
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
                this.layoutInfoTable(jsonResult['bestMatches'][i],i+1);
                
        }
        else{
            alert('Entre com um nome');
            document.getElementById('recipient-name').focus();
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

}
