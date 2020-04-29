
var itemButton = document.createElement('li');
var button = document.createElement('button');
var i = document.createElement('i');
var span = document.createElement('span');


function setup(){
    
    button.setAttribute('type','button');
    button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target','#exampleModal');
    button.setAttribute('onclick','teste()');
    i.setAttribute('class','fas fa-plus');
    span.textContent = 'Add Action';
    itemButton.setAttribute('class','itemList');
    
    button.appendChild(i);
    button.appendChild(span);
    itemButton.appendChild(button);
    
    document.getElementById('myList').appendChild(itemButton);
}


function formPostSend(){
    const request = require('request')

    const data = request.post(
        'localhost:3000/search',
        (error, res, body) => {
            
            if (error) {
                console.error(error)
                return
            }
            
            console.log(`statusCode: ${res.statusCode}`)
            console.log(body)
        }
    );
    
    console.log(data);
}

function teste(){
    console.log('apenas um teste');
}


function addAction(){    

    var list = document.getElementsByClassName('itemList');
    console.log(list);
    if ( list && list.length > 0 ){
        console.log('Entrei');
        document.getElementById('myList').appendChild(itemButton);
    }
    else{
        console.log("List count = ",list.length);
    }
}