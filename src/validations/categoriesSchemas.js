const Joi = require('joi');

const cartegoriesSchema = Joi.object({
  name: Joi.string()
    .required(),
});

module.exports = cartegoriesSchema;