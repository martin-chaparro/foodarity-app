const { Router } = require('express');

const router = new Router();
const { getCities } = require('../../controllers/locationsController');

router.get('/', getCities);

module.exports = router;
