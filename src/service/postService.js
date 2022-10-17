const { BlogPost, User, Category } = require('../models');

module.exports = {
  async getAll() {
    try {
      const posts = await BlogPost.findAll({
        include: [{
          model: User,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        { 
          model: Category,
          as: 'categories',
          through: { attributes: [] },
        }],
      });

      return posts;
    } catch (error) {
      return error;
    }
  },
  async getById(id) {
    const result = await BlogPost.findOne({
      where: { id },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    return result;
  },  
  async getByUserId(userId) {
    const result = await BlogPost.findOne({
      where: { userId },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    return result;
  },  
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
  async update({ title, content }, id) {
    const post = await BlogPost.findOne({ where: { id },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    post.update({ title, content });
    post.save();
    return post;
  },
};