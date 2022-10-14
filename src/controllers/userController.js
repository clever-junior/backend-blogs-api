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
  async store(req, res) {
    try {
      const { displayName, email, password, image } = req.body;

      const user = { displayName, email, password, image };
      
      const { code, message } = await service.create(user);
      
      if (message) return res.status(code).json({ message });

      const token = generateToken({});

      return res.status(201).json({ token });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};