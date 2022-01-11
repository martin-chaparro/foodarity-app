const { Router } = require('express');

const router = new Router();
const ValidationProduct = require('../../middlewares/validations/validationProduct');
const authMiddleware = require('../../middlewares/auth');
const {
  getProducts,
  postProduct,
  deletePublication,
} = require('../../controllers/productsController');

router.get('/', getProducts);
router.post('/', authMiddleware, ValidationProduct.post, postProduct);
router.delete('/delete/:id', authMiddleware, deletePublication);
// get by company id
// get by token

module.exports = router;
