const clickSignUp = function(){

    let name = document.querySelector('#name').value;
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    let password2 = document.querySelector('#confirmpassword').value;
    let card_no = document.querySelector('#card_no').value;
    let pin_code = document.querySelector('#pin_code').value;

    if( name == "" || email == "" || password == "" || password2 == "" || card_no == "" || pin_code == "" ){
        alert('input field should not be null');
        return ;
    }

    if( password != password2 ){
        alert('passwords didn\'t match');
        return ;
    }

    let send_obj = {
        name,
        email,
        password,
        card_no,
        pin_code,
    };
    fetch('http://localhost:3001/signup',{
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
            if( data.msg == 'signed up!')
            window.location.href = "/index.html" ;
        },500)
    })
    .catch(err=>{
        console.log("could not fetch");
        console.log(err);
    })
};