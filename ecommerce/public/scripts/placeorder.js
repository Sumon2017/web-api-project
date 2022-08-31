const checkout = function(){
    
    let myobj = {}
    let myobj_str = localStorage.getItem('webapipro');
    if(myobj_str){
        myobj = JSON.parse(myobj_str);
    }
    else {
        alert('pls select items');
        return ;
    }



    let orderdetails = '';
    let ammount = document.querySelector('#totalprice').innerHTML;

    for (const key of Object.keys(myobj)) {
        orderdetails+=myobj[key];
        orderdetails+='*';
        orderdetails+=key;
        orderdetails+=' + ';
    }

    let send_obj = {
        orderdetails,
        ammount,
    };


    fetch('http://localhost:3001/placeorder',{
        method: 'POST',
        credentials : 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(send_obj)
    })
    .then(response =>response.json())
    .then(data => {
        setTimeout(()=>{
            alert(data.msg)
            console.log('success');
        },500)
    })
    .catch(err=>{
        console.log("could not fetch");
        console.log(err);
    })
};