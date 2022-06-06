const mongoose = require('mongoose');

let cards = new mongoose.Schema({
    card_no : {
        type : String ,
        require : true 
    },
    pin_code :{
        type : String ,
        require : true 
    },
    balance :{
        type : String ,
        require : true 
    }
});

module.exports = mongoose.model('cards',cards);