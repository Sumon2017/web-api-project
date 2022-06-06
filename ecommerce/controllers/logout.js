
  
const logout = async (req,res) => {
    res.clearCookie('webproject');
    res.json({
        msg : 'logged out'
    });
};

module.exports=logout;