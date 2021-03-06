const path = require('path');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const userinfo = require(path.join(__dirname,'..','DbSchemas','userinfo'));
require('dotenv').config();

const login = async ( req , res ) => {

    const cookieConfig = {
        httpOnly: true,
        signed: true
    };

    const { email , password } = req.body;
    let user = await userinfo.find({ email });

    if( user.length == 0 ){
        res.json({
            msg : 'no account with this email'
        });
        return ;
    }

    user = user[0];

    bcrypt.compare( password , user.password ).then( function( result ){
        if( result ){
            jwt.sign({email}, process.env.SERVER_SECRET , { expiresIn: '1h' }, async (err,token) => {
                if(err){
                    console.log(err);
                    return ;
                }
                res.cookie('webproject', token , cookieConfig);
                res.json({
                    msg : 'you are logged in'
                });
            });
        }
        else{
            res.json({
                msg : 'incorrect password'
            });
        }
    } );

};

module.exports=login;