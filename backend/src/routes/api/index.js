const { Router } = require('express');

const companiesRoutes = require('./companies');
const userRoutes = require('./user');
const authRoutes = require('./auth');
const statesRoutes = require('./states');
const citiesRoutes = require('./cities');

const router = new Router();

router.use('/companies', companiesRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/states', statesRoutes);
router.use('/cities', citiesRoutes);


module.exports = router;
