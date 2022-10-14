const express = require('express');

const router = express.Router();

const controller = require('../controllers/userController');

const authMiddlewares = require('../middlewares/auth');

const userMiddlewares = require('../middlewares/userMiddlewares');

router.post('/login', authMiddlewares.authentication, controller.login);

router.post('/user', userMiddlewares.validation, controller.store);

module.exports = router;