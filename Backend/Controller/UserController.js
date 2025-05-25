const User = require('../Models/user')


const getusers = async (req, res)=>{
    const {userId} = req.user;
    const isUser = await User.findOne({_id: userId});

    if(!isUser){
        res.status(404).json({message: "user not found", success: false})
    }

    return res.json({
        user: isUser,
        message: ""
    })
}

module.exports = {
    getusers,
}