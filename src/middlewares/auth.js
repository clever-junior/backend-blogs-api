require('dotenv').config();

// const jwt = require('jsonwebtoken');

// const { JWT_SECRET: secret } = process.env;

const schema = require('../validations/userSchemas');

module.exports = {
  authentication(req, res, next) {
    try {
      const { email, password } = req.body;

      const validation = schema.validate({ email, password });

      if (validation.error) {
        const { error: { details: [{ message }] } } = validation;
        return (res.status(400).json({ message }));
      }

      next();
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};