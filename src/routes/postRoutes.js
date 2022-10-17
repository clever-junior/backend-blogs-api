const express = require('express');

const router = express.Router();

const controller = require('../controllers/postController');

const authMiddlewares = require('../middlewares/auth');

const postMiddlewares = require('../middlewares/postMiddlewares');

router.put('/post/:id',
  authMiddlewares.validateToken, postMiddlewares.updateValidation, controller.update);

router.get('/post/:id', authMiddlewares.validateToken, controller.getById);

router.get('/post', authMiddlewares.validateToken, controller.index);

router.post('/post', 
  authMiddlewares.validateToken, postMiddlewares.validateFields, controller.store);

module.exports = router;