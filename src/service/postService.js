const { BlogPost } = require('../models');

module.exports = {
  async create({ id: userId, title, content }) {
    try {
      const published = new Date();
      const updated = new Date();
      const result = await BlogPost.create({ title, content, userId, published, updated });
      
      return result;
    } catch (error) {
      return error;
    }
  },
};