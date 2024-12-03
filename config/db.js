const mongoose = require('mongoose')
require('dotenv').config();
const connection = async () =>{
    try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to MongoDB succesfully" )
    }
    catch(error){
        console.error("MongoDB connection failed:", error.message)
        process.exit(1)
    }
}

module.exports = connection