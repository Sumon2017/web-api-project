const mongoose = require('mongoose');

let transactions = new mongoose.Schema({
    from_card_no : {
        type : String ,
        require : true 
    },
    to_card_no : {
        type : String ,
        require : true 
    },
    ammount :{
        type : String ,
        require : true 
    },
    tnx_no :{
        type : String ,
        require : true 
    },
    time :{
        type : String ,
        require : true 
    }
});

module.exports = mongoose.model('transactions',transactions);