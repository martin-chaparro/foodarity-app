const { Router } = require('express');

const router = new Router();
const validationOrder = require('../../middlewares/validations/validationOrder');
const authMiddleware = require('../../middlewares/auth');
const {
  getOrdersByUser,
  getOrdersByCompany,
  postOrder,
} = require('../../controllers/ordersController');

router.get('/user', authMiddleware, getOrdersByUser);
router.get('/company', authMiddleware, getOrdersByCompany);
router.post('/:id', authMiddleware, validationOrder.post, postOrder);

module.exports = router;
