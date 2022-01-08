const { Router } = require('express');

const router = new Router();
const { getCities, getCitiesByState } = require('../../controllers/locationsController');

router.get('/', getCities);
router.get('/:stateId', getCitiesByState);

module.exports = router;
