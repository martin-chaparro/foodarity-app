/* eslint-disable camelcase */
const { Op } = require('sequelize');
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const Company = require('../models/Company');
const PaymentMethod = require('../models/PaymentMethod');
const Cart = require('../models/Cart');

const include = [
  {
    model: Company,
    as: 'company',
    attributes: { exclude: ['createdAt', 'updatedAt', 'CompanyTypeId'] },
  },
  {
    model: User,
    as: 'buyer',
    attributes: {
      exclude: [
        'createdAt',
        'updatedAt',
        'password',
        'CompanyId',
        'RoleId',
        'role_id',
      ],
    },
  },
  {
    model: PaymentMethod,
    as: 'paymentMethod',
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'OrderId', 'orderId'],
    },
  },
];

const attributes = {
  exclude: [
    'createdAt',
    'updatedAt',
    'UserId',
    'ProductId',
    'buyerId',
    'CompanyId',
    'productId',
    'PaymentMethodId',
    'paymentMethodId',
    'companyId',
  ],
};

const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req;
    const orders = await Order.findAll({
      where: { buyer_id: userId },
      include,
      attributes,
      order: [['id', 'DESC']],
    });
    const ids = [];
    orders.forEach((order) => {
      order.quantityByProduct.forEach((item) => {
        if (!ids.includes(item.product_id)) {
          ids.push(item.product_id);
        }
      });
    });
    const products = await Product.findAll({
      where: { id: ids }
    });

    const finalOrders = orders.map((order) => {
      const finalOrder = order;
      finalOrder.quantityByProduct = order.quantityByProduct.map((item) => {
        const finalItem = item;
        finalItem.product = products.find(
          (producto) => producto.id === item.product_id
        );
        return finalItem;
      });
      return finalOrder;
    });

    return res.status(200).json(finalOrders);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const getOrdersByCompany = async (req, res) => {
  try {
    const { userId } = req;

    const user = await User.findByPk(userId, {
      include: [{ model: Company, as: 'company' }],
    });

    if (!user.company_id) {
      return res.status(401).json({ msg: 'El usuaria no posee un comercio' });
    }
    if (user.company.company_type_id !== 1) {
      return res.status(401).json({
        message: 'La compania no es un comercio',
      });
    }
    if (user.company.status !== 'Habilitada') {
      return res.status(401).json({
        message: 'La compania no se encuentra habilitada',
      });
    }
    const orders = await Order.findAll({
      where: { company_id: user.company_id },
      include,
      attributes,
      order: [['id', 'DESC']],
    });
    const ids = [];
    orders.forEach((order) => {
      order.quantityByProduct.forEach((item) => {
        if (!ids.includes(item.product_id)) {
          ids.push(item.product_id);
        }
      });
    });
    const products = await Product.findAll({
      where: { id: ids }
    });
    return res.status(200).json({ orders, products });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const postOrder = async (req, res) => {
  // TODO AGREGAR CHECKEO DE COMPANY y USER
  const { userId } = req;
  const { date, quantityByProduct, paymentMethod, company_id } = req.body;
  try {
    const user = await User.findByPk(userId);
    const company = await Company.findByPk(company_id);

    if (!user.status) {
      return res.json({
        message: 'El usuario esta deshabilitado',
      });
    }
    if (user.deleted) {
      return res.json({
        message: 'El usuario fue borrado',
      });
    }
    if (company.status !== 'Habilitada') {
      return res.json({
        message: 'El comercio no esta habilitado',
      });
    }
    // aca

    const ids = [];

    quantityByProduct.forEach((item) => {
      if (!ids.includes(item.product_id)) {
        ids.push(item.product_id);
      }
    });

    const products = await Product.findAll({ where: { id: ids } });

    const products_ids = [];
    products.forEach((product) => {
      const qBp = quantityByProduct.find(
        (item) => item.product_id === product.id
      );
      if (product.status === 'published' && product.quantity >= qBp.quantity) {
        products_ids.push(product);
      }
    });

    if (ids.length !== products_ids.length) {
      return res
        .status(400)
        .json({
          message:
            'Alguno de los productos ya no esta publicado, o no tiene suficientes lotes',
        });
    }

    // eslint-disable-next-line consistent-return

    products.forEach(async (product) => {
      try {
        const qBp = quantityByProduct.find(
          (item) => item.product_id === product.id
        );
        const { product_id, quantity } = qBp;
        const productQuantity = product.quantity;
        if (productQuantity > quantity) {
          await Product.update(
            { quantity: productQuantity - quantity },
            { where: { id: product_id } }
          );
          await Cart.update(
            { quantity: productQuantity - quantity },
            {
              where: {
                product_id,
                quantity: { [Op.gte]: productQuantity - quantity },
              },
            }
          );
        }
        if (productQuantity === quantity) {
          await Product.update(
            { quantity: productQuantity - quantity, status: 'finished' },
            { where: { id: product_id } }
          );
          await Cart.destroy({ where: { product_id } });
        }
        return 'producto y carrito actualizado';
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    });

    const order = await Order.create({ date, quantityByProduct });
    await order.setCompany(1);
    await order.setBuyer(userId);
    await order.setPaymentMethod(paymentMethod);

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = { getOrdersByUser, getOrdersByCompany, postOrder };
