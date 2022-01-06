const { Router } = require('express');
const userRoutes = require('./user');
const authRoutes = require('./auth');
const statesRoutes = require('./states');
const citiesRoutes = require('./cities');

const router = new Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/states', statesRoutes);
router.use('/cities', citiesRoutes);

module.exports = router;
