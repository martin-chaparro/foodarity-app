const { Router } = require('express');

const router = new Router();

const {
  getCart, addToCart, removeInCart, clearCart
} = require('../../controllers/cartController')

router.get('/',getCart);
router.post('/add',addToCart);
router.post('/remove',removeInCart);
router.get('/clear',clearCart);

module.exports = router;
