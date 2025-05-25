
const Getimage = (req, res)=>{
   try {
      if(!req.file){
       return res.json({message: "No Image Uploaded"})
      }
    const imageUrl = `http://localhost:3000/users/image-uploads/${req.file.filename}`

    res.status(201).json({imageUrl});

   } catch (error) {
       res.status(500).json({message: error.message, success: false})
   }
}

module.exports = {
    Getimage,
}