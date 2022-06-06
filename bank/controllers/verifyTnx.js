const path = require('path');
const transactions = require(path.join(__dirname,'..','DbSchemas','transactions'));


const verifyTnx = async ( req , res ) => {

    const tnx_no = req.body.tnx_no;

    let data = await transactions.find({ tnx_no });
    
    if( data.length == 0 ){
        res.json({
            msg : 'no transaction with this tnx_no'
        });
        return ;
    }

    data = data[0];

    res.json({
        msg : "success",
        value : data,
    });


};

module.exports = verifyTnx ;