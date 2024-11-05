const User = require('../models/userSchema')
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
    let createdUser = await newUser.save()
    return { 
        user: createdUser
    };
}

const login = async(userData) =>{
    const {username, password} = userData
    const user = await User.findOne({username})
    if(!user){
        throw new Error("User Doesn't Exist")
    }
    const isValidPassword = await bcrypt.compare(password, user.password)
    if(!isValidPassword){
       throw new Error("Invalid Password")
    }
    const generatedToken = await generateToken({
        username:user.username,
        role : user.role
    })
    user.authToken = generatedToken
    let updatedUser = await user.save()
    if(!updatedUser){
       throw  new Error("Failed to login")

    }
    return {
        token :  generatedToken
    }
    
}

module.exports = {
    healthCheck,
    register,
    login
}