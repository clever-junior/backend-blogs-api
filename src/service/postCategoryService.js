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
  async findById(id) {
    try {
      const result = await PostCategory.findOne({ where: { postId: id } });

      return result;
    } catch (error) {
      return error;
    }
  },
  async getAll() {
    try {
      const result = await PostCategory.findAll();

      return result;
    } catch (error) {
      return error;
    }
  },
};