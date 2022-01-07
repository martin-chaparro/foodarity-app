const { Router } = require('express');

const router = new Router();
const { getHome } = require('../../controllers/authSocialController');

router.get('/', getHome);

module.exports = router;
