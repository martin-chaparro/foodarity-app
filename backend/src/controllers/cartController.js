const Cart = require('../models/Cart');
const Product = require('../models/Product');

async function getCartProducts(userId) {
  const cart = await Cart.findAll({
    where: { user_id: userId },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
  return cart;
}

const getCart = async (req, res) => {
  try {
    const { userId } = req;
    const cart = await getCartProducts(userId);
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
const addToCart = async (req, res) => {
  try {
    const { userId } = req;
    const { pid, quantity } = req.query;
    const action = req.query.action || 'add';
    if (!pid && !quantity) {
      return res
        .status(401)
        .json({ message: 'Debes ingresar un product id y/o una cantidad' });
    }
    const product = await Product.findByPk(pid);
    if (!product) {
      return res.status(401).json({ message: 'El producto no existe' });
    }
    if (product.status !== 'published') {
      return res
        .status(401)
        .json({ message: 'El producto ya no esta publicado' });
    }
    const cartProduct = await Cart.findOne({
      where: { user_id: userId, product_id: pid },
    });
    switch (action) {
      case 'add':
        if (!cartProduct) {
          if (product.quantity < quantity) {
            return res
              .status(401)
              .json({
                message: 'El producto no tienen tantos lotes disponibles',
              });
          }
          const finalProduct = await Cart.create({ quantity });
          await finalProduct.setUser(userId);
          await finalProduct.setProduct(pid);
        } else {
          const finalQuantity = cartProduct.quantity + quantity;
          if (product.quantity < finalQuantity) {
            return res
              .status(401)
              .json({
                message: 'El producto no tienen tantos lotes disponibles',
              });
          }
          await cartProduct.update({ quantity: finalQuantity });
        }
        break;
      case 'modify':
        // eslint-disable-next-line no-case-declarations
        const finalQuantity = cartProduct.quantity + quantity;
        if (product.quantity < finalQuantity) {
          return res
            .status(401)
            .json({
              message: 'El producto no tienen tantos lotes disponibles',
            });
        }
        await cartProduct.update({ quantity: finalQuantity });
        break;
      default:
        break;
    }
    const cart = await getCartProducts(userId);
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
const removeInCart = async (req, res) => {
  try {
    const { userId } = req;
    const { pid } = req.query;
    if (!pid) {
      return res.status(401).json({ message: 'Debes ingresar un product id' });
    }
    Cart.destroy({ where: { product_id: pid }, force: true });
    const cart = await getCartProducts(userId);
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
const clearCart = async (req, res) => {
  try {
    const { userId } = req;
    Cart.destroy({ where: { user_id: userId }, force: true });
    const cart = await getCartProducts(userId);
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeInCart,
  clearCart,
};
