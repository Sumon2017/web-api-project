const path = require('path');
const orders = require(path.join(__dirname,'..','DbSchemas','orders'));

const myorders = async ( req , res ) => {

    const  email  = res.locals.email;
    if(email != "admin"){
        res.json({
            msg : "you are not admin"
        });
        return
    }
    let all_my_orders = await orders.find({});

    res.json(all_my_orders);

};

module.exports=myorders;