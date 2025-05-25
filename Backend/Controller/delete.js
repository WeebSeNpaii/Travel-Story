const fs = require('fs')
const path = require('path')

const deleteimage = async (req, res)=>{
 const {imageUrl} = req.query
 if(!imageUrl){
  res.status(404).json({message: "ImageUrl parameter is required", success: false})
 }
   try {
     const filename = path.basename(imageUrl);
     console.log(filename)
     const prevfile = path.join(__dirname, '..')
     const filepath = path.join(prevfile, 'uploads', filename)
    console.log(filepath)
   if(fs.existsSync(filepath)){
      fs.unlinkSync(filepath);

    return res.status(200).json({message: "Image deleted successfully", success: true})
   }else{
      return res.status(404).json({message: "image not found", error: true})
   }

   } catch (error) {
      return res.status(500).json({message: error.message, error: true})
   }
  


}

module.exports = deleteimage;