const bcrypt = require('bcrypt')
const User = require('../Models/user')
const jwt = require('jsonwebtoken');

const signup = async (req, res)=>{
    try {
        const {fullName, email, password} = req.body;
     if(!fullName || !email || !password){
         return res.status(400).json({message: "All fields are required", success: false})
     }

     const data = await User.findOne({email});
     if(data){
      return res.status(400).json({message:"User already exists, please login", success: false})
     }
     
    const hashpassword = await bcrypt.hash(password, 10)

    const user =  await User.create({
        fullName,
        email,
        password: hashpassword
     }).then(()=>{
        const accesstoken = jwt.sign(
            {userId: User._id},
            process.env.Jwt_SECRET,
           {
            expiresIn: "72h"
           }

        )
      res.status(201).json({
         message: "Account Successfully Created!",
         success: true,
         accesstoken,
         user: {fullName, email, hashpassword}
        })

     }).catch((error)=>{
    return res.status(400).json({message: "User not Created", success: false})
     })
    } catch (error) {
      return res.status(500).json({message: "Internal Server Error", success:false})
    }
     
}

const login = async (req, res)=>{

   
     const {email, password} = req.body;
      if(!email || !password){
        res.status(400).json({message: "All fields are required!", success: false})
     }
     const user =await User.findOne({email});   
     
     if(!user){
        return res.status(404).json({message: "user not found!", success: false})
     }
     const isPasswordValid = await bcrypt.compare(password, user.password)
     if(!isPasswordValid){
        res.status(400).json({message: "Fields are incorrect!", success: false})
     }
     const accesstoken = jwt.sign(
        {userId: user._id},
        process.env.Jwt_SECRET,
        {
            expiresIn: '72h'
        }
     )
     
     return res.json(
        {message: "Login Successful",
            success: true,
        accesstoken,
        user,
        
        },
       
     )
     
}

module.exports = {
    signup,
    login
}