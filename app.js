const express = require('express')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const authenticateRotues = require("./middleware/authenticationMiddleware")
const app = express()
connectDB()

app.use(express.json())
app.use(authenticateRotues)
app.use('/api/users', userRoutes)

module.exports = app
