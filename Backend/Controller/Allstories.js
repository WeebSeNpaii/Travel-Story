const travelstories = require('../Models/addstory')

const allstories = async (req, res)=>{
   const {userId} = req.user

    try {
    
     const stories =  await travelstories.find({userId: userId}).sort({
        isFavourite: -1,
     })

     res.status(200).json({message: "all the stories successfully fetched", success: true, travelstories: stories, userId})
    } catch (error) {
        res.status(400).json({message: "unable to fetch user stories", error, success: false})
    }
   
}

module.exports = {
    allstories,
}