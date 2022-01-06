const { Router } = require('express');

const router = new Router();
const { getHome } = require('../../controllers/authController');

router.get('/', getHome);

module.exports = router;
