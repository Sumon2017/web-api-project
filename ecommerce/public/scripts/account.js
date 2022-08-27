const clickSubmit = function(){
    let name = document.querySelector('#name').value;
    let card_no = document.querySelector('#card_no').value;
    let pin_code = document.querySelector('#pin_code').value;
    if(name==""||card_no==""||pin_code==""){
        alert('input field should not be null');
        return ;
    }
    let send_obj = {
        name,
        card_no,
        pin_code
    };
    fetch('http://localhost:3001/updateacc',{
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
            if( data.msg == 'your account info updated')
            window.location.href = "/index.html" ;
        },500)
    })
    .catch(err=>{
        console.log("could not fetch");
        console.log(err);
    })
};