const User = require('../models/userSchema')
const Token = require('../models/Token')
const bcrypt =  require('bcryptjs')
const { generateToken } = require('../utils/TokenUtil')

const healthCheck = () =>{
    return {
        status: 'UP',
        timestamp: new Date().toISOString(),
        message:"User Service is healthy !"
    }
}

const register = async(userData) =>{
    const role  = userData.role || 'user'
    const {name, username, email, password} = userData;
 
    const existingUser = await User.findOne({
        $or: [{email}, {username}]
    })
    if(existingUser){
        throw new Error('User already exist with this email  or username')
    }
    const hasedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
        name, username, email, password: hasedPassword,role, tokens:[]
    })
    const savedUser = await newUser.save()
    const tokenValue = generateToken({id:savedUser._id, email:savedUser.email,  role:savedUser.role}) 
    
    const token = new Token({
        userId : savedUser._id,
        token:tokenValue,
        type:'auth',
        expiresAt:new Date(Date.now() + 3600 * 1000)
    })
    const savedToken = await token.save()
    savedUser.tokens.push(savedToken._id)
    savedUser.save()
    return { user: savedUser, token: tokenValue };
}

module.exports = {
    healthCheck,
    register
}