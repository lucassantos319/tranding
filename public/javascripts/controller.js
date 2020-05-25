class Layout{

    constructor(){
        this.clockTime = [];
    }

    calcTimeEnable(data,date){
        let timeEnable = [];
        for (let i in data){
            if (i.includes(date)){
                timeEnable.push(i.split(" ")[1]);
            }
        }
        return timeEnable.reverse();
    }

    calcVariationValue(data){
        let date = new Date();
        let mouth ;
        if (date.getMonth()+1 < 10){
            mouth = '0'+(date.getMonth()+1);
        }  
        else
            mouth = date.getMonth()+1;

        let currentDay  =  date.getFullYear() + "-" + mouth + "-" + (date.getDate()) ;
        var count = 0,volumeTotal=0 ;
        var volumeAux1,volumeAux2; 
        this.clockTime = this.calcTimeEnable(data,currentDay);
        console.log(data)

        for (let i = 0 ; i < this.clockTime.length-1; i++){
            volumeAux1 = parseFloat(data[currentDay+" "+this.clockTime[i]]['4. close']);
            volumeAux2 = parseFloat(data[currentDay+" "+this.clockTime[i+1]]['4. close']);
            
            console.log(data[currentDay+" "+this.clockTime[i]]['4. close'],data[currentDay+" "+this.clockTime[i+1]]['4. close'])
            if(volumeAux1 > volumeAux2){
                volumeTotal -= 1-(volumeAux2/volumeAux1);
                console.log("neg -",this.clockTime[i],1-(volumeAux2/volumeAux1));
            }
            else{
                volumeTotal += 1-(volumeAux1/volumeAux2);
                console.log("pos -",this.clockTime[i],1-(volumeAux1/volumeAux2));
            }
        
        }

        console.log(volumeTotal);
        return volumeTotal/100;
    }

    calcVariationVolume(data){
        
        let variationVolumeDate = []
        let date = new Date();
        let mouth ;
        if (date.getMonth()+1 < 10){
            mouth = '0'+(date.getMonth()+1);
        }  
        else
            mouth = date.getMonth()+1;

        console.log()
        let currentDay  =  date.getFullYear() + "-" + mouth + "-" + (date.getDate()) ;
        var volumeTotal=0 ;
        var volumeAux1,volumeAux2; 
        this.clockTime = this.calcTimeEnable(data,currentDay);

        for (let i = 0 ; i < this.clockTime.length-1    ; i++){

            volumeAux1 = parseFloat(data[currentDay+" "+this.clockTime[i]]['5. volume']);
            volumeAux2 = parseFloat(data[currentDay+" "+this.clockTime[i+1]]['5. volume']);
                
            if(volumeAux1 > volumeAux2){
                volumeTotal -= 1-(volumeAux2/volumeAux1);
                console.log("neg -",this.clockTime[i],1-(volumeAux2/volumeAux1))
            }

            else{
                volumeTotal += 1-(volumeAux1/volumeAux2);
                console.log("neg -",this.clockTime[i],1-(volumeAux2/volumeAux1));
            }
        }
        
        console.log(volumeTotal)
        if (volumeTotal != 0 && volumeTotal != NaN) 
            return volumeTotal/100;
        else
            return 0;
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
        variationValue.innerHTML = this.calcVariationValue(jsonData['Time Series (5 min)'])
        variationVolume.innerHTML = this.calcVariationVolume(jsonData['Time Series (5min)'])
        
        
        var last = 0 ;
        for (let i in jsonData['Time Series (5min)'])
            if (last == 0){
                lastCurrentValue.innerHTML = jsonData['Time Series (5min)'][i]['4. close'];
                last++;
            }
            
        var j;   
        for ( j in jsonData['Time Series (5min)'])
            lastDailyClose.innerHTML = jsonData['Time Series (5min)'][j]['4. close'];
        
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