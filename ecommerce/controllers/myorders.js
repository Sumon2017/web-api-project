const path = require('path');
const orders = require(path.join(__dirname,'..','DbSchemas','orders'));

const myorders = async ( req , res ) => {

    const  email  = res.locals.email;
    let all_my_orders = await orders.find({ email });

    res.json(all_my_orders);

};

module.exports=myorders;