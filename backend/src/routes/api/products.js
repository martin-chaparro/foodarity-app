const { Router } = require('express');

const router = new Router();
const ValidationProduct = require('../../middlewares/validations/validationProduct');
const {
  getProducts,
  postProduct,
} = require('../../controllers/productsController');

router.get('/', getProducts);
router.post('/', ValidationProduct.post, postProduct);

module.exports = router;
