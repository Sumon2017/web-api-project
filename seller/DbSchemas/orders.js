const mongoose = require('mongoose');

let orders = new mongoose.Schema({
    email : {
        type : String,
        trim : true , 
        maxLength : [50,'email should be within 50 characters'],
    },
    orderdetails : {
        type : String ,
        require : true ,
    },
    tnx_no : {
        type : String,
        require : true ,
    },
    tnx_no_2 : {
        type : String,
        require : true ,
    },
    ammount : {
        type : String,
        require : true ,
    },
    status : {
        type : String ,
        require : true ,
    },
    time : {
        type : String ,
        require : true ,
    },

});

module.exports = mongoose.model('orders',orders);