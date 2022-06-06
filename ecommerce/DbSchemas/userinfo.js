const mongoose = require('mongoose');

let userinfo = new mongoose.Schema({
    name : {
        type : String ,
        require : true ,
    },
    email : {
        type : String,
        required : [true,'give an email'],
        trim : true , 
        unique : true , 
        maxLength : [50,'email should be within 50 characters'],
    },
    password : {
        type : String,
        require : true ,
    },
    card_no : {
        type : String ,
        require : true ,
    },
    pin_code : {
        type : String ,
        require : true ,
    },

});

module.exports = mongoose.model('userinfo',userinfo);