const travel = require('../Models/addstory')
const path = require('path')
const fs = require('fs')


const delete_travel = async (req, res)=>{
   const {id} = req.params;
   const {userId} = req.user;
   const travelstory = await travel.findOne({_id: id, userId: userId}) 

   if(!travelstory){
    res.json({message: "Travelstory not exists", error: true})
   }
await travel.deleteOne({_id: id, userId: userId});
   const imageURL = travelstory.imageUrl;
   const filename = path.basename(imageURL)
  
   const prevfile = path.join(__dirname, '..')
    const filepath = path.join(prevfile, 'uploads', filename )
    console.log(filepath)
  
  
    fs.unlinkSync(filepath, (err)=>{
        if(err)
res.status(400).json({message: err.message, success:false})
    });
     
    res.status(200).json({message: "Travel Story deleted Successfully"})
    
   
}

module.exports = {
    delete_travel
}