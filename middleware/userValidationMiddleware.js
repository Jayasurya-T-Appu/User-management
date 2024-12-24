const { registerValidatorSchema, loginValidatorSchema, passwordResetSchema } = require('../validators/userValidator')

/**
 * Validates the user registration data using a schema.
 * Returns a 400 error if validation fails, otherwise proceeds to the next middleware.
 *
 * @param {Object} req - The HTTP request object containing registration data
 * @param {Object} res - The HTTP response object
 * @param {Function} next - The next middleware function
 * @returns {void}
 */
const validateRegistration = (req, res, next) => {
    const { error } = registerValidatorSchema.validate(req.body) 
    if (error) {
        return res
            .status(400)
            .json({ error: error.details[0].message })
    }
    next()
}

/**
 * Validates the user login data using a schema.
 * Returns a 400 error if validation fails, otherwise proceeds to the next middleware.
 *
 * @param {Object} req - The HTTP request object containing login data
 * @param {Object} res - The HTTP response object
 * @param {Function} next - The next middleware function
 * @returns {void}
 */
const validateLogin = (req, res, next) =>{
    const {error} = loginValidatorSchema.validate(req.body)
    if (error) {
        return res
            .status(400)
            .json({ error: error.details[0].message })
    }
    next()
}

const validatePasswordReset = (req, res, next) =>{
    const {error} = passwordResetSchema.validate(req.body)
    if (error) {
        return res
            .status(400)
            .json({ error: error.details[0].message })
    }
    next()
}
module.exports = {validateRegistration, validateLogin, validatePasswordReset}