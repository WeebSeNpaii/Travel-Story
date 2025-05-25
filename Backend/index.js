const express = require('express')
const path = require('path')
require('./Models/db')
require('./Models/user')
const bodyparser = require('body-parser')
const AuthRouter = require('./Routes/AuthRouter')
const UsersRouter = require('./Routes/UsersRouter')

const app = express();
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 4000;

app.use(cors({origin: "*"}))
app.use(express.json())
app.use(bodyparser.json())
app.use('/auth', AuthRouter)
app.use('/users', UsersRouter)
app.use('/users/image-uploads', express.static(path.join(__dirname, "uploads")))
app.use('/users/image-uploads', express.static(path.join(__dirname, 'assets')))

app.listen(PORT, ()=>{console.log(`Server is running at PORT-${PORT}`)})