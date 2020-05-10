
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