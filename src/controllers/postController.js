const service = require('../service/postService');

const categoriesService = require('../service/categoriesService');

const postCategoryService = require('../service/postCategoryService');

// const { validateCategories } = require('../validations/categoriesSchemas');

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
};