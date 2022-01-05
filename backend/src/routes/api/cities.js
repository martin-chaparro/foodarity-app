const { Router } = require('express');

const router = new Router();
const { getCities } = require('../../controllers/locations');

router.get('/', getCities);

module.exports = router;
