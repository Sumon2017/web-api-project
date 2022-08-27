const path = require('path');
const fetch = require('node-fetch');
const orders = require(path.join(__dirname,'..','DbSchemas','orders'));

const payseller = async ( req , res ) => {

    const  email  = res.locals.email;
    if(email != "admin"){
        res.json({
            msg : "you are not admin"
        });
    }

    const tnx_no = req.body.tnx_no;

    let one_order = await orders.find({tnx_no});

    one_order = one_order[0]

    let order_id = one_order._id

    one_order = {
        email:one_order.email,
        orderdetails:one_order.orderdetails,
        tnx_no:one_order.tnx_no,
        tnx_no_2:'',
        ammount:one_order.ammount,
        status:one_order.status,
        time:one_order.time
    }

    data = {
        from_card_no : '001',
        to_card_no : '003',
        pin_code : '1234',
        ammount : one_order.ammount
    }

    data = JSON.stringify(data)

    fetch( 'http://localhost:3003/transact' , {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : data
    }).then(response =>response.json())
    .then(result=>{
        if(result.msg == 'success'){
            one_order = {
                obj : one_order
            }
            one_order.obj.tnx_no_2 = result.value.tnx_no
            one_order = JSON.stringify(one_order)
            fetch( 'http://localhost:3002/paidbyeco' , {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : one_order
            }).then(response =>response.json())
            .then(async result=>{
                if(result.msg == 'success'){
                    await orders.findByIdAndUpdate(order_id,{ status:'seller paid' } ,function (err, docs) {
                        if (err){
                            console.log(err)
                        }
                        else{
                            console.log()
                        };
                    }
                    ).clone();
                }
                res.json(result);
            })
            .catch((err)=>{
                console.log("notification not sent 2");
            });

        }else{
            res.json(result)
        }
    })
    .catch((err)=>{
        console.log("notification not sent");
    });

    

    

};

module.exports=payseller;