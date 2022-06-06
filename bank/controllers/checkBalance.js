const path = require('path');
const cards = require(path.join(__dirname,'..','DbSchemas','cards'));

const checkBalance = async ( req , res ) => {

    const card_no = req.body.card_no;
    const pin_code = req.body.pin_code;

    let data = await cards.find({ card_no });
    
    if( data.length == 0 ){
        res.json({
            msg : 'no card with this number'
        });
        return ;
    }

    data = data[0];

    if( data.pin_code != pin_code ){
        res.json({
            msg : 'incorrect pin code'
        });
        return ;
    }

    res.json({
        msg : "success",
        value : data.balance,
    });

};

module.exports = checkBalance ;