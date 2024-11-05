const userServices = require('../services/userService')

const healthCheck = (req, res) =>{
    const healthStatus = userServices.healthCheck()
    res.status(200).json(healthStatus)
}

const registerUser = async (req, res) =>{
    try {
        const userData = req.body
        const result = await userServices.register(userData)
        if(!result){
            return res.status(400).json({message: 'Failed to register user'})
        }
        res.status(201).json({
            message: 'User registered successfully',
            user: result.user,
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const loginUser = async (req, res) =>{
    try{
        const userData = req.body
        
        const result = await userServices.login(userData)
        if(!result){
            return res.status(400).json({message: 'Failed to login user'})
        }
        res.status(200).json({
            message: 'User logged in successfully',
            token : result.token
        })

    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
}



module.exports = {
    healthCheck,
    registerUser,
    loginUser
}