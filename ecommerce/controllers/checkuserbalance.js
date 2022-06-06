const path = require('path');
const fetch = require('node-fetch');
const userinfo = require(path.join(__dirname,'..','DbSchemas','userinfo'));

const checkuserbalance = async ( req , res ) => {

    const email = res.locals.email;
    let user = await userinfo.find({ email });

    if( user.length == 0 ){
        res.json({
            msg : 'no account with this email'
        });
        return ;
    }

    user = user[0];

    const card_no = user.card_no;
    const pin_code = user.pin_code;

    data = {
        card_no,
        pin_code
    }

    data=JSON.stringify(data);

    fetch( 'http://localhost:3003/checkbalance' , {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : data
    }).then(response =>response.json())
    .then(result=>{
        res.json(result)
    })
    .catch((err)=>{
        console.log("notification not sent");
    });

};

module.exports=checkuserbalance;