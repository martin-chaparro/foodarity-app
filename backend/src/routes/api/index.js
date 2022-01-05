const { Router } = require('express');
const homeRoutes = require('./home');
const statesRoutes = require('./states');
const citiesRoutes = require('./cities');

const router = new Router();

router.use('/home', homeRoutes);
router.use('/states', statesRoutes);
router.use('/states', citiesRoutes);

module.exports = router;
