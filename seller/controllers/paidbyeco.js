const path = require('path');
const orders = require(path.join(__dirname,'..','DbSchemas','orders'));

const paidbyeco = async ( req , res ) => {

    const obj = req.body.obj;

    data = obj;

    data.status='seller paid'

    orders.create(obj)
    
    res.json({
        msg : 'success'
    })

};

module.exports=paidbyeco;