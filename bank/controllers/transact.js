const path = require('path');
const cards = require(path.join(__dirname,'..','DbSchemas','cards'));
const transactions = require(path.join(__dirname,'..','DbSchemas','transactions'));


function make_tnx_id(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const transact = async ( req , res ) => {

    const from_card_no = req.body.from_card_no;
    const to_card_no = req.body.to_card_no;
    const pin_code = req.body.pin_code;
    const ammount = req.body.ammount;

    let data = await cards.find({ card_no:from_card_no });
    
    if( data.length == 0 ){
        res.json({
            msg : 'no card with this sender\'s number'
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

    if( parseInt(data.balance) < parseInt(ammount) ){
        res.json({
            msg : 'insufficient balance'
        });
        return ;
    }

    /////////////////////////////////
    /////////////////////////////////

    const final_balance_of_sender = (parseInt(data.balance) - parseInt(ammount)).toString()

    let data2 = await cards.find({ card_no:to_card_no });

    if( data2.length == 0 ){
        res.json({
            msg : 'no card with this receiver\'s number'
        });
        return ;
    }

    data2 = data2[0];

    const final_balance_of_receiver = (parseInt(data2.balance) + parseInt(ammount)).toString()

    const time = Date.now()

    cards.findByIdAndUpdate(data._id,{ balance : final_balance_of_sender } ,function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("sender balance updated");
        };
    });

    cards.findByIdAndUpdate(data2._id,{ balance : final_balance_of_receiver } ,function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("receiver balance updated");
        };
    });


    const tnx_obj =  {
        from_card_no,
        to_card_no,
        ammount,
        time,
        tnx_no : make_tnx_id(10),
    }

    transactions.create(tnx_obj).then(async()=>{
        res.json({
            msg : "success",
            value : tnx_obj,
        });
    });


};

module.exports = transact ;