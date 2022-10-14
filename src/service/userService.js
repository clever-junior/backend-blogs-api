const { User } = require('../models');

module.exports = {
  async getByEmail(email) {
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) return { message: 'Invalid fields' };

      return {};
    } catch (error) {
      return error;
    }
  },
};