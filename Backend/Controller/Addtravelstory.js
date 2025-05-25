const travelSchema = require('../Models/addstory')
const mongoose = require('mongoose')

const addtravelstory = async (req, res)=>{

    const {title, story, visitedLocation, imageUrl, visitedDate} = req.body;
    const {userId} = req.user;

    if(!title || !story || !visitedDate || !imageUrl || !visitedLocation){
        res.status(400).json({message: "All fields are required", success: false})
       
    }

    const parsedVisitedDate = new Date(parseInt(visitedDate));

    try{
        const travelStory = new travelSchema({
            title,
            story,
            visitedLocation,
            imageUrl,
            visitedDate: parsedVisitedDate,
            userId,
              
        });


        await travelStory.save();
        res.status(201).json({message: "Added Successfully", success: true, story: travelStory})
    }catch(err){
        res.status(400).json({message: "Story not added", err})
    }

}

module.exports = {
    addtravelstory,
}