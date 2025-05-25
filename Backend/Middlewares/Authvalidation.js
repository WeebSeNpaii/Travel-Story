const jwt = require('jsonwebtoken')

const Authvalidate = (req, res, next)=>{
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];

  if(!token){
    res.status(400).json({message: "Token not found"})
  }
   
  jwt.verify(token, process.env.Jwt_SECRET, (err, user)=>{
    if(err) return res.status(400)
    req.user = user;
   next();

  })

    
}

module.exports = {
    Authvalidate,
}