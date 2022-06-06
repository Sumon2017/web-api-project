const path = require('path');
const bcrypt = require('bcrypt');
const userinfo = require(path.join(__dirname,'..','DbSchemas','userinfo'));

const signup = async (req,res) => {
    let { name , email , password , card_no , pin_code } = req.body;
    
    try{
        user = await userinfo.find({email}).exec();
        if(user.length){
            res.json({
                msg:'account already exists with this email'
            });
            return ;
        }
    }
    catch(err){
        console.log(err);
    }


    try{
        bcrypt.hash(password,11).then(async(hash)=>{
            userinfo.create({
                name,
                email,
                password : hash ,
                card_no ,
                pin_code ,
            })
        }).then(async()=>{
            res.json({
                msg:'signed up!'
            });
        });
    }
    catch(err){
        console.log(err);
    }
};


module.exports=signup;