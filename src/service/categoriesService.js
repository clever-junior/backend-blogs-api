const { Category } = require('../models');

module.exports = {
  async create(name) {
    try {
      const findCategory = await Category.findOne({ where: { name } });

      if (findCategory) return { code: 409, message: 'Category already registered' };

      const result = await Category.create({ name });

      if (!result) return { code: 400, message: 'Error registering category' };

      return { code: 201, result };
    } catch (error) {
      return error;
    }
  },
  async getAll() {
    try {
      const categories = await Category.findAll();

      return categories;
    } catch (error) {
      return error;   
    }
  },
  async getById(pk) {
    try {
      const category = await Category.findByPk(pk);

      return category;
    } catch (error) {
      return error;
    }
  },
};