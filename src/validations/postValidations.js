const Joi = require('joi');

const message = 'Some required fields are missing';

const postSchema = Joi.object({
  title: Joi.string()
    .required()
    .messages({
      'any.required': message,
      'string.empty': message,
    }),
  content: Joi.string()
  .required()
  .messages({
    'any.required': message,
    'string.empty': message,
  }),
  categoryIds: Joi.array()
    .required()
    .messages({
      'any.required': message,
      'string.empty': message,
    }),
});

module.exports = postSchema;