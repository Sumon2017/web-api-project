const path = require('path');
const userinfo = require(path.join(__dirname,'..','DbSchemas','userinfo'));

const updateacc = async ( req , res ) => {

    const email = res.locals.email;
    let data = await userinfo.find({email});
    data=data[0];
    const name = req.body.name;
    const card_no = req.body.card_no;
    const pin_code = req.body.pin_code;

    userinfo.findByIdAndUpdate(data._id,{ name,card_no,pin_code } ,function (err, docs) {
                if (err){
                    console.log(err)
                }
                else{
                    console.log("Updated User : ", docs);
                };
            }

    );

    res.json({
        msg : 'your account info updated',
    });

};

module.exports = updateacc ;