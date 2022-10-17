const schema = require('../validations/postValidations');

module.exports = {
  async validateFields(req, res, next) {
    const { title, content, categoryIds } = req.body;
    
    const validation = await schema.validate({ title, content, categoryIds });

    if (validation.error) {
      const { error: { details: [{ message }] } } = validation;
      return (res.status(400).json({ message }));
    }

    next();
  },
};