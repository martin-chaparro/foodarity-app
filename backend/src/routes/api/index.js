const { Router } = require('express');
const companiesRoutes = require('./companies');

const router = new Router();

router.use('/companies', companiesRoutes);

module.exports = router;
