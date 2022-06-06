const path = require('path');
const express = require('express');
const  connectDB  = require(path.join(__dirname,'connectDb'));
require('dotenv').config();
const bodyParser = require('body-parser');
const  checkBalance  = require(path.join(__dirname,'controllers','checkBalance'));
const  transact  = require(path.join(__dirname,'controllers','transact'));
const  verifyTnx  = require(path.join(__dirname,'controllers','verifyTnx'));

let port = 3003;

//connecting to mongodb atlas cloud
connectDB();

var app = express();

app.use(bodyParser.json());

app.post('/checkbalance',checkBalance)
app.post('/transact',transact)
app.post('/verifytnx',verifyTnx)


app.listen(port,() => {
    console.log(`Web Project :{Bank App} at ${port}`);
}
);