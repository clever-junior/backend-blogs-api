const service = require('../service/postService');

module.exports = {
  async store(req, res) {
    try {
      const { title, content, categoryIds } = req.body;

      const newPost = await service.create({ title, content, categoryIds });
      
      if (!newPost) return res.status(400).json({ message: 'Error' });

      return res.status(201).json({ message: 'Criado com sucesso' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};