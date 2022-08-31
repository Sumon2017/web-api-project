const clickbalance = function(){
    let card_no = document.querySelector('#card_no').value;
    let pin_code = document.querySelector('#pin_code').value;
    if(card_no==""||pin_code==""){
        alert('input field should not be null');
        return ;
    }
    let send_obj = {
        card_no,
        pin_code
    };
    fetch('http://localhost:3003/checkbalance',{
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
            alert(data.msg + '\n' + data.value)
            console.log('success');
        },500)
    })
    .catch(err=>{
        console.log("could not fetch");
        console.log(err);
    })
};