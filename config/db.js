const mongoose = require('mongoose')
const config = require('config')

const connection = async () =>{
    try{
    await mongoose.connect(config.get("MONGO_URI"))
    }
    catch(error){
        console.error("MongoDB connection failed:", error.message)
        process.exit(1)
    }
}

module.exports = connection