const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'any.required': 'Some required fields are missing',
      'string.empty': 'Some required fields are missing',
      'string.email': 'Invalid fields',
    }),
  password: Joi.string()
    .required()
    .min(6)
    .messages({
      'any.required': 'Some required fields are missing',
      'string.empty': 'Some required fields are missing',
      'string.min': 'Invalid fields',
    }),
});

module.exports = userSchema;