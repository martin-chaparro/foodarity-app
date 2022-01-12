const { Router } = require('express');

const router = new Router();
const ValidationProduct = require('../../middlewares/validations/validationProduct');
const authMiddleware = require('../../middlewares/auth');
const {
  getProducts,
  postProduct,
  deletePublication,
  getProductById,
  getCompanyProductsById,
  getCompanyProductsByAuth,
} = require('../../controllers/productsController');

router.get('/', getProducts);
router.post('/', authMiddleware, ValidationProduct.post, postProduct); // TODO manejar la imagen cloudinary
router.delete('/id/:id', authMiddleware, deletePublication);
router.get('/id/:id', getProductById);
router.get('/company/:id', getCompanyProductsById);
router.get('/byAuth', authMiddleware, getCompanyProductsByAuth);

module.exports = router;
