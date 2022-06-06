const path = require('path');
const fetch = require('node-fetch');
const userinfo = require(path.join(__dirname,'..','DbSchemas','userinfo'));
const orders = require(path.join(__dirname,'..','DbSchemas','orders'));

const placeorder = async ( req , res ) => {

    const time = Date.now()

    const orderdetails = req.body.orderdetails;
    const ammount = req.body.ammount;

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
        from_card_no : card_no,
        to_card_no : '001',
        pin_code,
        ammount
    }

    data=JSON.stringify(data);

    fetch( 'http://localhost:3003/transact' , {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : data
    }).then(response =>response.json())
    .then(result=>{
        if(result.msg == "success"){
            let new_data = {
                email,
                orderdetails,
                tnx_no : result.value.tnx_no,
                ammount : result.value.ammount,
                status : 'pending',
                time
            };
            orders.create(new_data)
            .then(()=>{
                res.json({msg : "success"})
            });
        }else{
            res.json(result)
        }
    })
    .catch((err)=>{
        console.log("notification not sent");
    });

};

module.exports=placeorder;