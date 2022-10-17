const service = require('../service/postService');

const categoriesService = require('../service/categoriesService');

const postCategoryService = require('../service/postCategoryService');

const categoryIdsValidation = async (categoryIds) => {
  let validation = {};

  const result = await Promise.all(categoryIds.map(async (categoryId) => 
  categoriesService.getById(categoryId)));

  result.forEach((category) => {
    if (category === null) {
      validation = { message: '"categoryIds" not found' };
    }
  });

  return validation;
};

module.exports = {
  async index(_req, res) {
    try {
      const result = await service.getAll();

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error });
    }
  },

  async store(req, res) {
    try {
      const { title, content, categoryIds } = req.body;
      const id = req.userId;

      const { message } = await categoryIdsValidation(categoryIds);

      if (message) return res.status(400).json({ message });

      const post = { id, title, content };

      const newPost = await service.create(post);

      await postCategoryService.create(newPost.id, categoryIds);

      if (!newPost) return res.status(400).json({ message: 'Error' });

      return res.status(201).json(newPost);
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  async getById(req, res) {
    try {
      const { id } = req.params;
      
      const result = await service.getById(id);

      if (!result) return res.status(404).json({ message: 'Post does not exist' });

      return res.status(200).json(result);
    } catch (error) {
      return error;
    }
  },
  async update(req, res) {
    try {
      const { title, content } = req.body;
      const { id } = req.params;
      const { userId } = req;

      const post = await service.getById(id);

      if (post.userId !== userId) return res.status(401).json({ message: 'Unauthorized user' });

      const result = await service.update({ title, content }, id);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      const { userId } = req;

      const post = await service.getById(id);
      
      if (!post) return res.status(404).json({ message: 'Post does not exist' });
      
      if (post.userId !== userId) return res.status(401).json({ message: 'Unauthorized user' });
      
      await service.delete(id);

      return res.status(204).json({});
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};