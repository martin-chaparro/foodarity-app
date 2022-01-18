const { Router } = require('express');

const authMiddleware = require('../../middlewares/auth');

const router = new Router();
const {
  validateCode,
  getUrlRegister
} = require('../../controllers/mercadopagoController');

router.post('/register', validateCode);
router.get('/register', authMiddleware, getUrlRegister);

module.exports = router;
