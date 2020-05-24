class Layout{

    constructor(){

        this.clockTime = ["09:10:00", "09:15:00", "09:20:00", "09:25:00", "09:30:00", "09:35:00",
                          "09:40:00", "09:45:00", "09:50:00", "09:55:00", "10:00:00", "10:05:00",
                          "10:10:00", "10:15:00", "10:20:00", "10:25:00", "10:30:00", "10:35:00",
                          "10:40:00", "10:45:00", "10:50:00", "10:55:00", "11:00:00", "11:05:00", 
                          "11:10:00", "11:15:00", "11:20:00", "11:25:00", "11:30:00", "11:35:00", 
                          "11:40:00", "11:45:00", "11:50:00", "11:55:00", "12:00:00", "12:05:00", 
                          "12:10:00", "12:15:00", "12:20:00", "12:25:00", "12:30:00", "12:35:00", 
                          "12:40:00", "12:45:00", "12:50:00", "12:55:00", "13:00:00", "13:05:00", 
                          "13:10:00", "13:15:00", "13:20:00", "13:25:00", "13:30:00", "13:35:00", 
                          "13:40:00", "13:45:00", "13:50:00", "13:55:00", "14:00:00", "14:05:00", 
                          "14:10:00", "14:15:00", "14:20:00", "14:25:00", "14:30:00", "14:35:00", 
                          "14:40:00", "14:45:00", "14:50:00", "14:55:00", "15:00:00", "15:05:00", 
                          "15:10:00", "15:15:00", "15:20:00", "15:25:00", "15:30:00", "15:35:00", 
                          "15:40:00", "15:45:00", "15:50:00"];
    }

    calcVariationValue(data){
        let date = new Date();
        let mouth ;
        if (date.getMonth()+1 < 10){
            mouth = '0'+(date.getMonth()+1);
        }  
        else
            mouth = date.getMonth()+1;

        let currentDay  =  date.getFullYear() + "-" + mouth + "-" + (date.getDate()-2) ;
        // console.log(currentDay);
        var count = 0,volumeTotal=0 ;
        var volumeAux1,volumeAux2; 
        
        for (let i = 0 ; i < this.clockTime.length-1; i++){
            volumeAux1 = parseFloat(data[currentDay+" "+this.clockTime[i]]['4. close']);
            volumeAux2 = parseFloat(data[currentDay+" "+this.clockTime[i+1]]['4. close']);
            
            console.log(volumeAux1,volumeAux2)
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

        let currentDay  =  date.getFullYear() + "-" + mouth + "-" + (date.getDate()-2) ;
        // console.log(currentDay);
        var volumeTotal=0 ;
        var volumeAux1,volumeAux2; 
        for (let i = 0 ; i < this.clockTime.length-1; i++){
            volumeAux1 = parseFloat(data[currentDay+" "+this.clockTime[i]]['5. volume']);
            volumeAux2 = parseFloat(data[currentDay+" "+this.clockTime[i+1]]['5. volume']);
                
            if(volumeAux1 > volumeAux2)
                volumeTotal -= 1-(volumeAux2/volumeAux1);
            else
                volumeTotal += 1-(volumeAux1/volumeAux2);
        }
        
        return volumeTotal/100;

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