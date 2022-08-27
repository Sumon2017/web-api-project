const path = require('path');
const express = require('express');
const  connectDB  = require(path.join(__dirname,'connectDb'));
require('dotenv').config();
const bodyParser = require('body-parser');
const  seeallorders  = require(path.join(__dirname,'controllers','seeallorders'));
const  shipped  = require(path.join(__dirname,'controllers','shipped'));
const  paidbyeco  = require(path.join(__dirname,'controllers','paidbyeco'));


let port = 3002;

//connecting to mongodb atlas cloud
connectDB();


var app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/seeallorders',seeallorders)
app.post('/shipped',shipped)
app.post('/paidbyeco',paidbyeco)



app.listen(port,() => {
    console.log(`Web Project :{Seller App} at ${port}`);
}
);