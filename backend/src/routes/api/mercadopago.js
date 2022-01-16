const { Router } = require('express');

const router = new Router();
const {
  addSeller,
} = require('../../controllers/mercadopagoController');

router.post('/register', addSeller);

module.exports = router;
