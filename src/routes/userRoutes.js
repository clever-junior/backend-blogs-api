const express = require('express');

const router = express.Router();

const controller = require('../controllers/userController');

const middlewares = require('../middlewares/auth');

router.post('/login', middlewares.authentication, controller.login);

router.get('/user', (_req, res) => res.send('oloco'));

module.exports = router;