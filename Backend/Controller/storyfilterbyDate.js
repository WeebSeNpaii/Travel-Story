const travel = require('../Models/addstory');
const isfavourite = require('./isfavourite');

const storyfilterbyDate = async (req , res)=>{

    const {startDate, endDate} = req.query;
    const {userId} = req.user;

    try {
        const start = new Date(parseInt(startDate))
        const end = new Date(parseInt(endDate))

      const filterstories =   await travel.find({
            userId: userId,
            visitedDate: {$gte: start , $lte: end},
        }).sort({isFavourite :-1});
       
        res.status(200).json({stories: filterstories})

    } catch (error) {
        res.status(500).json({message: error.message })
    }

}

module.exports = storyfilterbyDate;