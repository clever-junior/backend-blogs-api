const express = require('express');

const userRoutes = require('./userRoutes');

const categoriesRoutes = require('./categoriesRoutes');

const router = express.Router();

router.use(userRoutes);

router.use(categoriesRoutes);

module.exports = router;