const Joi = require('joi');

const loginSchema = Joi.object({
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

const userSchema = Joi.object({
  displayName: Joi.string()
    .min(8),
  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .required()
    .min(6),
});

module.exports = {
  loginSchema,
  userSchema,
};