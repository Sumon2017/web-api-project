const path = require('path');
const express = require('express');
const  connectDB  = require(path.join(__dirname,'connectDb'));
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const auth = require(path.join(__dirname,'auth'));
const  signup  = require(path.join(__dirname,'controllers','signup'));
const  login  = require(path.join(__dirname,'controllers','login'));
const  logout  = require(path.join(__dirname,'controllers','logout'));
const  updateacc  = require(path.join(__dirname,'controllers','updateacc'));
const  checkuserbalance  = require(path.join(__dirname,'controllers','checkuserbalance'));
const  placeorder  = require(path.join(__dirname,'controllers','placeorder'));
const  myorders  = require(path.join(__dirname,'controllers','myorders'));
const  seeallorders  = require(path.join(__dirname,'controllers','seeallorders'));
const  payseller  = require(path.join(__dirname,'controllers','payseller'));
const  getshipped  = require(path.join(__dirname,'controllers','getshipped'));

let port = 3001;

//connecting to mongodb atlas cloud
connectDB();

var app = express();

app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));


app.post('/signup',signup)
app.post('/login',login)
app.get('/logout',logout)
app.post('/getshipped',getshipped)

// Authentication Point
app.use(auth);

app.post('/updateacc',updateacc)
app.get('/checkuserbalance',checkuserbalance)
app.post('/placeorder',placeorder)
app.get('/myorders',myorders)
app.get('/seeallorders',seeallorders)
app.post('/payseller',payseller)

app.listen(port,() => {
    console.log(`Web Project :{Ecommerce App} at ${port}`);
}
);