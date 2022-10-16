const express = require('express');

const userRoutes = require('./userRoutes');

const categoriesRoutes = require('./categoriesRoutes');

const postRoutes = require('./postRoutes');

const router = express.Router();

router.use(userRoutes);

router.use(categoriesRoutes);

router.use(postRoutes);

module.exports = router;