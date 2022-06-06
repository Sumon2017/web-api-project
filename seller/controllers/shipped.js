const path = require('path');
const fetch = require('node-fetch');
const orders = require(path.join(__dirname,'..','DbSchemas','orders'));


const shipped = async ( req , res ) => {

    const tnx_no_2 = req.body.tnx_no_2;

    one_order = await orders.find({tnx_no_2})

    one_order = one_order[0]

    order_id = one_order._id

    try{
        await orders.findByIdAndUpdate(order_id,{ status:'shipped' } ,function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log()
            };
        }
        ).clone();
    }catch(err){
        console.log(err)
    }

    data = {
        tnx_no : one_order.tnx_no
    }

    data=JSON.stringify(data);

    fetch( 'http://localhost:3001/getshipped' , {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : data
    }).then(response =>response.json())
    .then(result=>{
        res.json(result);
    })
    .catch((err)=>{
        console.log("notification not sent");
    });

};

module.exports=shipped;