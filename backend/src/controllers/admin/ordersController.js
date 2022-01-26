const { Op } = require('sequelize');
const Product = require('../../models/Product');
const Order = require('../../models/Order');
const PaymentMethod = require('../../models/PaymentMethod');
const User = require('../../models/User');
const Company = require('../../models/Company');


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


const getOrders = async (request, response) => {
  const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
  };

  const { page, size, search } = request.query;

  const { limit, offset } = getPagination(page, size);

  const orderAttr = [['id', 'DESC']];

  try {
    let orders = []
    if (!search) {
      orders = await Order.findAndCountAll({
        include,
        attributes,
        orderAttr,
        offset,
        limit,
      });
    } else {
      const users = await User.findAll({where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } },
        ],
      }}).then(res => res.map(user => user.id))
      const companies = await Company.findAll({where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } },
        ],
      }}).then(res => res.map(company => company.id))
      console.log(users, companies)
      orders = await Order.findAndCountAll({
        include,
        where: {
          buyer_id: users,
          company_id: users
        },
        attributes,
        orderAttr,
        offset,
        limit,
      });
      
    }
     const ids = [];
      orders.rows.forEach((order) => {
        order.quantityByProduct.forEach((item) => {
          if (!ids.includes(item.product_id)) {
            ids.push(item.product_id);
          }
        });
      });
      const products = await Product.findAll({
        where: { id: ids },
      });
  
      const finalOrders = orders.rows.map((order) => {
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
      console.log(finalOrders)
    return response.status(200).json({
      orders: finalOrders,
      totalOrders: orders.count,
      size: limit,
      page: offset,
      totalPages: Math.ceil(orders.count / limit),
    });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server error' });
  }
};

module.exports = {
  getOrders
}