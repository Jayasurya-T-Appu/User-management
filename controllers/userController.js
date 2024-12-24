const userServices = require('../services/userService')

const healthCheck = (req, res) =>{
    const healthStatus = userServices.healthCheck()
    res.status(200).json(healthStatus)
}

/**
 * Handles user registration by reciving user data from the requesst
 * 
 * @async
 * @function registerUser
 * @param {Object} req - HTTP request object
 * @param {Object} req.body -{
    name:string,
    username: string,
    email: string,
    password: string,
    confirmPassword: string
} - The user data submitted in the request body
 * @param {Object} res - The HTTP response object
 * @returns {Promise<Object>}
 */
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
/**
 * Handles user login by reciving user data from the requesst
 * @param {Object} req - HTTP request object
 * @param {Object} req.body - 
 * {
    username:string,
    password:string
}
 * - The user data submitted in the request body
 * @param {Object} res - The HTTP response object
 * @returns {Promise<Object>}
 */
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

const passwordReset = async (req, res) =>{
    try {
        const passwordResetData = req.body
        const result = await userServices.passwordReset(passwordResetData)
        if(result){
            return res.status(200).json({
                success: true,
                message: 'Password updated successfully'
              });
        }
        else{
            return res.status(400).json({message: 'Failed to update password'})
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = {
    healthCheck,
    registerUser,
    loginUser,
    passwordReset
}