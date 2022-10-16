// const { PostCategory, BlogPost } = require('../models');

module.exports = {
  async create({ title, content, categoryIds }) {
    try {
      return { title, content, categoryIds };
    } catch (error) {
      return error;
    }
  },
};