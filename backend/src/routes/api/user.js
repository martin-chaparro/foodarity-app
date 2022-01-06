const { Router } = require('express');

const router = new Router();
const { getHome } = require('../../controllers/userController');

router.get('/', getHome);

module.exports = router;
