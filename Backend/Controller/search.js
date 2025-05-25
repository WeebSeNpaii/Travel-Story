const travel = require('../Models/addstory');


const search = async (req, res)=>{
    const {searchQuery} = req.query;
    const {userId} = req.user;

    if(!searchQuery){
        res.status(400)
        .json({message: "query is required", success: false})
    }
    try {
         const searchResults = await travel.find({
        userId: userId,
        $or: [
             {title : {$regex: searchQuery, $options: 'i'}},
            {story: {$regex: searchQuery, $options: 'i'}},
            {visitedLocation: {$regex: searchQuery, $options: 'i'}},
        ],    
    }).sort({isFavourite: -1});

    res.status(200).json({stories: searchResults})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
   
}

module.exports = search