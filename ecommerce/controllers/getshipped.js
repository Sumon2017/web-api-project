const path = require('path');
const orders = require(path.join(__dirname,'..','DbSchemas','orders'));


const getshipped = async ( req , res ) => {

    const tnx_no = req.body.tnx_no

    one_order = await orders.find({tnx_no})

    one_order = one_order[0]

    await orders.findByIdAndUpdate(one_order._id,{ status:'shipped' } ,function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log()
        };
    }
    ).clone();

    res.json({
        msg:'success'
    })

};

module.exports=getshipped;