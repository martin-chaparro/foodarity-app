const { Router } = require('express');

const docsRoutes = require('./docs')
const companiesRoutes = require('./companies');
const userRoutes = require('./user');
const authRoutes = require('./auth');
const statesRoutes = require('./states');
const citiesRoutes = require('./cities');
const productsRoutes = require('./products');

const router = new Router();

// Docs Route
router.use('/docs', docsRoutes);

router.use('/companies', companiesRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/states', statesRoutes);
router.use('/cities', citiesRoutes);
router.use('/products', productsRoutes);

module.exports = router;
