const { Router } = require('express');

const router = new Router();
const {
  getProducts,
  postProduct,
} = require('../../controllers/productsController');

router.get('/', getProducts);
router.post('/', postProduct);

module.exports = router;
