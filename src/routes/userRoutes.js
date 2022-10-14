const express = require('express');

const router = express.Router();

const controller = require('../controllers/userController');

const authMiddlewares = require('../middlewares/auth');

const userMiddlewares = require('../middlewares/userMiddlewares');

router.post('/login', authMiddlewares.authentication, controller.login);

router.get('/user/:id', authMiddlewares.validateToken, controller.findById);

router.get('/user', authMiddlewares.validateToken, controller.index);

router.post('/user', userMiddlewares.validation, controller.store);

module.exports = router;