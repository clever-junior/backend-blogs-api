const { User } = require('../models');

module.exports = {
  async create(user) {
    try {
      const findUser = await User.findOne({ where: { email: user.email } });

      if (findUser) return { code: 409, message: 'User already registered' };

      const result = await User.create(user);

      if (!result) return { code: 500, message: 'Error registering user' };

      return {};
    } catch (error) {
      return error;
    }
  },
  async getAll() {
    try {
      const user = await User.findAll({ attributes: { exclude: ['password'] } });

      return user;
    } catch (error) {
      return error;
    }
  },
  async getById(id) {
    try {
      const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });

      return user;
    } catch (error) {
      return error;
    }
  },
  async getByEmail(email) {
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) return { message: 'Invalid fields' };

      return user;
    } catch (error) {
      return error;
    }
  },
};