const mongoose = require('mongoose')
require('dotenv').config();

/**
 * Establishes a connection to the MongoDB database.
 * 
 * Uses the `MONGO_URI` environment variable for the connection string.
 * Logs a success message upon a successful connection.
 * Logs an error message and exits the process if the connection fails.
 * 
 * @async
 * @function connection
 * @returns {Promise<void>} - Resolves when the connection is successful.
 * @throws {Error} - Throws an error if the connection to MongoDB fails.
 */
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