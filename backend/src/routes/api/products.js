const { Router } = require('express');

const router = new Router();
const ValidationProduct = require('../../middlewares/validations/validationProduct');
const authMiddleware = require('../../middlewares/auth');
const {
  getProducts,
  postProduct,
  cancelPublication,
} = require('../../controllers/productsController');

router.get('/', getProducts);
router.post('/', authMiddleware, ValidationProduct.post, postProduct);
router.put('/cancel/:id', cancelPublication);

module.exports = router;
