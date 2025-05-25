const travel = require('../Models/addstory')


const edittravel = async (req,res)=>{
    const {userId} = req.user;
    const {id} = req.params;


    const {title, story, visitedLocation, visitedDate, imageUrl} = req.body;

    if(!title || !story || !visitedLocation || !visitedDate ){
        res.status(400).json({message: "All fields are required"})
    }

    const parsedVisitedDate = new Date(parseInt(visitedDate))

    try {
   
    const travelstory = await travel.findOne({_id: id, userId: userId});

    if(!travelstory){
       res.status(404).json({message: "travelstory not found"})
    }

    const placeholderImg = "http://localhost:3000/users/assets/placeholder.jpeg"
    travelstory.title = title;
    travelstory.story = story;
    travelstory.visitedLocation = visitedLocation;
    travelstory.visitedDate = parsedVisitedDate;
    travelstory.imageUrl = imageUrl || placeholderImg;

    travelstory.save();

    res.status(200).json({message: "Update Successfull", success: true, story: travelstory})
    } catch (error) {
        res.status(400).json({message: "Not Updated", error: true})
    }

}

module.exports = {
    edittravel,
}