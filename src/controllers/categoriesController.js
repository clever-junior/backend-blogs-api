const service = require('../service/categoriesService');

const schema = require('../validations/categoriesSchemas');

module.exports = {
  async index(_req, res) {
    try {
      const categories = await service.getAll();

      if (!categories) return res.status(400).json({ message: 'Error' });

      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  async store(req, res) {
    try {
      const { name } = req.body;
      
      const validation = schema.categoriesSchema.validate({ name });

      if (validation.error) {
        const { error: { details: [{ message }] } } = validation;
        return (res.status(400).json({ message }));
      }

      const { code, message, result } = await service.create(name);

      if (message) return res.status(code).json({ message });

      return res.status(code).json(result);
    } catch (error) {
      return res.status(400).json({ error });
    }
  },
};