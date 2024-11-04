const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const {validateRegistration} = require('../middleware/userValidationMiddleware')
router.get('/health', userController.healthCheck)
router.post('/register', validateRegistration, (req, res)=>{
    userController.registerUser(req, res)
})




module.exports = router

