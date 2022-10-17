const schema = require('../validations/postValidations');

module.exports = {
  async validateFields(req, res, next) {
    const { title, content, categoryIds } = req.body;
    
    const validation = await schema.postSchema.validate({ title, content, categoryIds });

    if (validation.error) {
      const { error: { details: [{ message }] } } = validation;
      return (res.status(400).json({ message }));
    }

    next();
  },
  async updateValidation(req, res, next) {
    const { title, content } = req.body;
    
    const validation = await schema.postUpdateSchema.validate({ title, content });

    if (validation.error) {
      const { error: { details: [{ message }] } } = validation;
      return (res.status(400).json({ message }));
    }

    next();
  },
};