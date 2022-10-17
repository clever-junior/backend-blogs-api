require('dotenv').config();

const jwt = require('jsonwebtoken');

const { JWT_SECRET: SECRET } = process.env;

const { loginSchema: schema } = require('../validations/userSchemas');

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
  async validateToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'Token not found' });

    try {
      return jwt.verify(token, SECRET, (error, decoded) => {
        if (error) return res.status(401).json({ message: 'Expired or invalid token' });

        req.userId = decoded.id;

        next();
      });
    } catch (error) {
      return res.status(401).json({ error });
    }
  },
};