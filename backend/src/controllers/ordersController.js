const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const Company = require('../models/Company');
const PaymentMethod = require('../models/PaymentMethod');

const include = [
  {
    model: Product,
    as: 'product',
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'CompanyId', 'CategoryId'],
    },
  },
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
      where: { buyerId: userId },
      include,
      attributes,
      order: [['id', 'DESC']],
    });
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getOrdersByCompany = async (req, res) => {
  try {
    const { userId } = req;
   
    const user = await User.findByPk(userId, {
      include: [{ model: Company, as: 'company' }],
    });

    if (!user.companyId) {
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
      where: { companyId: user.companyId },
      include,
      attributes,
      order: [['id', 'DESC']],
    });
    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const postOrder = async (req, res) => {
  // TODO AGREGAR CHECKEO DE COMPANY y USER
  const { userId } = req;
  const { id } = req.params;
  const { date, quantity, paymentMethod } = req.body;
  try {
    const user = await User.findByPk(userId);
    const product = await Product.findByPk(id);
    const company = await Company.findByPk(product.companyId);

    console.log(company);
    const productQuantity = product.quantity;
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
    if (product.status !== 'published') {
      return res.json({
        message: 'El producto no esta publicado',
      });
    }
    if (productQuantity < quantity) {
      return res.json({
        message: 'El producto no tiene esa cantidad de lotes',
      });
    }
    if (productQuantity > quantity) {
      Product.update(
        { quantity: productQuantity - quantity },
        { where: { id } }
      );
    }
    if (productQuantity === quantity) {
      Product.update(
        { quantity: productQuantity - quantity, status: 'finished' },
        { where: { id } }
      );
    }

    const order = await Order.create({ date, quantity });
    await order.setCompany(1);
    await order.setBuyer(userId);
    await order.setProduct(id);
    order.setPaymentMethod(paymentMethod);

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = { getOrdersByUser, getOrdersByCompany, postOrder };
