const { Router } = require('express');
const authMiddleware = require('../../middlewares/auth');

const router = new Router();

const {
  getCart, addToCart, removeInCart, clearCart
} = require('../../controllers/cartController')

router.get('/',authMiddleware,getCart);
router.post('/add',authMiddleware,addToCart);
router.delete('/remove',authMiddleware,removeInCart);
router.post('/clear',authMiddleware,clearCart);

module.exports = router;
