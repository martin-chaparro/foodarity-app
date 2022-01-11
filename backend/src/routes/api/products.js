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
router.post('/', authMiddleware, ValidationProduct.post, postProduct); // TODO manejar la imagen cloudinary
router.delete('/delete/:id', authMiddleware, deletePublication);
// por id de product
// get by company id por params (solo published)
// get by token 

module.exports = router;
