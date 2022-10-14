require('dotenv').config();

const jwt = require('jsonwebtoken');

const service = require('../service/userService');

const { JWT_SECRET: SECRET } = process.env;

const generateToken = (params = {}) => (
  jwt.sign(params, SECRET)
);

module.exports = {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      const { message } = await service.getByEmail(email);

      if (message) return res.status(400).json({ message });

      const token = generateToken({ email, password });

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ error });      
    }
  },
};