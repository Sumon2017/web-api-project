const path = require('path');
const orders = require(path.join(__dirname,'..','DbSchemas','orders'));

const seeallorders = async ( req , res ) => {

    data = await orders.find({});
    res.json(data);

};

module.exports=seeallorders;