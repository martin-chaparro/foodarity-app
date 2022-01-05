const { Router } = require('express');
const homeRoutes = require('./home');

const router = new Router();

router.use('/home', homeRoutes);

module.exports = router;
