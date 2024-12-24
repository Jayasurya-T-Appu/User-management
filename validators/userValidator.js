const Joi = require('joi')
// Register validation schema
const registerValidatorSchema = Joi.object({
    name: Joi.string()
      .trim()
      .min(3)
      .max(30)
      .messages({
        'string.empty': 'Name cannot be empty.',
        'string.min': 'Name must be at least 3 characters long.',
        'string.max': 'Name must be at most 30 characters long.',
        'any.required': 'Name is required.',
    }),
    username: Joi.string().alphanum().min(3).max(30).required()
    .messages({
        'string.alphanum': 'Username must contain only alphanumeric characters',
        'string.min': 'Username must be at least 3 characters long',
        'string.max': 'Username cannot exceed 30 characters',
        'any.required': 'Username is required',
    }),
    email: Joi.string().email().required()
    .messages({
      'string.email': 'Please enter a valid email address',
      'any.required': 'Email is required',
    }),
    password: Joi.string().min(8).required()
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'any.required': 'Password is required',
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    .messages({
      'any.only': 'Passwords do not match',
      'any.required': 'Confirm password is required',
    })
})

const loginValidatorSchema = Joi.object({
  username: Joi.string().required()
  .messages({
    'any.required': 'Username is required',
  }),
  password: Joi.string().required()
  .messages({
    'any.required': 'Password is required',
  }),
})

const passwordResetSchema = Joi.object({
  email: Joi.string().email().required()
  .messages({
    'string.email': 'Please enter a valid email address',
    'any.required': 'Email is required'
  }),
  old_password : Joi.string().required()
  .messages({
    'any.required': 'Password is required',
  }),
  new_password: Joi.string().min(8).required()
    .pattern(/^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]*$/, 'valid characters')
    .pattern(/(?=.*[A-Z])/, 'uppercase letter')
    .pattern(/(?=.*[0-9])/, 'number')
    .pattern(/(?=.*[!@#$%^&*(),.?":{}|<>])/, 'symbol')
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one number, and one special symbol',
      'any.required': 'Password is required',
    }),
  confirm_password : Joi.string().required().valid(Joi.ref('new_password'))
  .messages({
    'any.required': 'Confirmation password is required',
    'any.only': 'Passwords must match'
  })

})

module.exports = {registerValidatorSchema, loginValidatorSchema, passwordResetSchema}