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

module.exports = {registerValidatorSchema, loginValidatorSchema}