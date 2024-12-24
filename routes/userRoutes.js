const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const {validateRegistration,validateLogin,validatePasswordReset } = require('../middleware/userValidationMiddleware')

router.get('/health', userController.healthCheck)
router.post('/register', validateRegistration, (req, res)=>{
    userController.registerUser(req, res)
})
router.post('/login', validateLogin, (req, res)=>{
    userController.loginUser(req, res)
})
router.post('/password-reset',validatePasswordReset, (req,res)=>{userController.passwordReset(req,res)})




module.exports = router

