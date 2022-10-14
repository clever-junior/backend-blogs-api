const { userSchema: schema } = require('../validations/userSchemas');

module.exports = {
  validation(req, res, next) {
    try {
      const { displayName, email, password } = req.body;

      const validation = schema.validate({ displayName, email, password });

      if (validation.error) {
        const { error: { details: [{ message }] } } = validation;
        return (res.status(400).json({ message }));
      }

      next();
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};