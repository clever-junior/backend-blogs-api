const express = require('express');

const router = express.Router();

const controller = require('../controllers/postController');

const authMiddlewares = require('../middlewares/auth');

router.post('/post', authMiddlewares.validateToken, controller.store);

module.exports = router;