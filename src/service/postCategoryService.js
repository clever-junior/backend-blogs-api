const { PostCategory } = require('../models');

module.exports = {
  async create(postId, categoryIds) {
    try {
      await Promise.all(categoryIds.map(async (categoryId) => PostCategory.create({
        postId,
        categoryId,
      })));
    } catch (error) {
      return error;
    }
  },
};