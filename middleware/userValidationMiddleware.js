const { registerValidatorSchema, loginValidatorSchema } = require('../validators/userValidator')

const validateRegistration = (req, res, next) => {
    const { error } = registerValidatorSchema.validate(req.body) 
    if (error) {
        return res
            .status(400)
            .json({ error: error.details[0].message })
    }
    next()

}

const validateLogin = (req, res, next) =>{
    const {error} = loginValidatorSchema.validate(req.body)
    if (error) {
        return res
            .status(400)
            .json({ error: error.details[0].message })
    }
    next()
}

module.exports = {validateRegistration, validateLogin}