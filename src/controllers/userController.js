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
      const { email } = req.body;
      
      const result = await service.getByEmail(email);

      const { message } = result;

      if (message) return res.status(400).json({ message });

      const token = generateToken({ id: result.id });

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ error });      
    }
  },
  async index(_req, res) {
    try {
      const users = await service.getAll();

      if (!users) return res.status(400).json({ message: 'Error' });

      return res.status(200).json(users);
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
  async findById(req, res) {
    try {
      const { id } = req.params;

      const user = await service.getById(id);

      if (!user) return res.status(404).json({ message: 'User does not exist' });

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error });
    } 
  },
};