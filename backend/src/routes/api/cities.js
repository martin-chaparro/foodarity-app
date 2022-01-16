const { Router } = require('express');
const authMiddleware = require('../../middlewares/auth');

const router = new Router();
const {
  getCities,
  getCitiesByState,
} = require('../../controllers/locationsController');

router.get('/', getCities);
router.get('/:stateId',authMiddleware, getCitiesByState);

module.exports = router;
