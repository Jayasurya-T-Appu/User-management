const config = require('config')
const jwt = require('jsonwebtoken')

const SECRET_KEY = config.get("JWT_SECRET")

/**
 * Generates a JSON Web Token (JWT)
 * @param {Object} payload - The data to include in the token
 * @param {string} expiresIn - The token expiration time (e.g., '1h', '2d')
 * @returns {string} - The generated token
 */
const generateToken = (payload, expiresIn = '1h') =>{
    return jwt.sign(payload, SECRET_KEY, {expiresIn})
}


/**
 * Verifies a JSON Web Token (JWT)
 * @param {string} token - The token to verify
 * @returns {Object|null} - The decoded payload if valid, or null if invalid
 */
const verifyToken = (token) =>{
    try{
        const decoded = jwt.verify(token, SECRET_KEY)
        return decoded
    }
    catch(error){
        return null
    }
}

module.exports = {generateToken,verifyToken}