const userServices = require('../services/userService')

const healthCheck = (req, res) =>{
    const healthStatus = userServices.healthCheck()
    res.status(200).json(healthStatus)
}

const registerUser = async (req, res) =>{
    try {
        const userData = req.body
        const result = await userServices.register(userData)
        res.status(201).json({
            message: 'User registered successfully',
            user: result.user,
            token: result.token,
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



module.exports = {
    healthCheck,
    registerUser
}