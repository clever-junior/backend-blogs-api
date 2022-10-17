const express = require('express');

const router = express.Router();

const controller = require('../controllers/postController');

const authMiddlewares = require('../middlewares/auth');

const postMiddlewares = require('../middlewares/postMiddlewares');

router.post('/post', 
  authMiddlewares.validateToken, postMiddlewares.validateFields, controller.store);

module.exports = router;