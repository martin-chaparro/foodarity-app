const { Router } = require('express');

const router = new Router();
const {
  validateCode,
  getUrlRegister
} = require('../../controllers/mercadopagoController');

router.post('/register', validateCode);
router.get('/register/:companyId', getUrlRegister);

module.exports = router;
