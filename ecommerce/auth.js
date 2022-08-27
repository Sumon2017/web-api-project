const path = require('path');
var jwt = require('jsonwebtoken');

const auth = async (req,res,next) => {
    const token = req.signedCookies.webproject;
    if(!token){
        res.json({
            msg : 'no access token , pls login'
        });
        return ;
    }
    jwt.verify( token , process.env.SERVER_SECRET , async (err , decoded ) => {
        if(err){
            res.json({
                msg : 'expired login again'
            });
            console.log('expired login');
            return ;
        }
        res.locals.email=decoded.email;
        console.log('ok');
        next();
    });
};

module.exports=auth;