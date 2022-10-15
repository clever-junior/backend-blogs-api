const service = require('../service/categoriesService');

module.exports = {
  async store(req, res) {
    try {
      const { name } = req.body;

      const { code, message, result } = await service.create(name);

      if (message) return res.status(code).json({ message });

      return res.status(code).json(result);
    } catch (error) {
      return res.status(400).json({ error });
    }
  },
};