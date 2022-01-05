const { Router } = require('express');

const router = new Router();
const { getStates } = require('../../controllers/locations');

router.get('/', getStates);

module.exports = router;
