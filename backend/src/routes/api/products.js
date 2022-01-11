const { Router } = require('express');

const router = new Router();
const ValidationProduct = require('../../middlewares/validations/validationProduct');
const {
  getProducts,
  postProduct,
  cancelPublication,
} = require('../../controllers/productsController');

router.get('/', getProducts);
router.post('/', ValidationProduct.post, postProduct);
router.put('/cancel/:id', cancelPublication);

module.exports = router;
