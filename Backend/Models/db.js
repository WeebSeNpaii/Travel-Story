const mongoose = require('mongoose')
require('dotenv').config();

const mongoConnect = mongoose.connect(process.env.Mongo_URL)


module.exports = mongoConnect;