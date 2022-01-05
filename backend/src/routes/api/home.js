const { Router } = require('express');

const router = new Router();
const { getHome } = require('../../controllers/home');

router.get('/', getHome);

module.exports = router;
