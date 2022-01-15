const { Op } = require('sequelize');
const Category = require('../../models/Category');
const Product = require('../../models/Product');
const User = require('../../models/User');
const Company = require('../../models/Company');
const Address = require('../../models/Address');
const State = require('../../models/State');
const City = require('../../models/City');

const include = [
  {
    model: Category,
    as: 'category',
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  },
  {
    model: Company,
    as: 'company',
    include: [
      {
        model: Address,
        as: 'address',
        include: [
          {
            model: State,
            as: 'state',
            attributes: {
              exclude: ['createdAt', 'updatedAt'],
            },
          },
          {
            model: City,
            as: 'city',
            attributes: {
              exclude: ['createdAt', 'updatedAt'],
            },
          },
        ],
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'CompanyId', 'addressId'],
        },
      },
    ],
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  },
  {
    model: User,
    as: 'publisher',
    attributes: {
      exclude: [
        'phone',
        'createdAt',
        'updatedAt',
        'password',
        'status',
        'CompanyId',
        'RoleId',
        'role_id',
      ],
    },
  },
];
const attributes = {
  exclude: [
    'createdAt',
    'updatedAt',
    'CategoryId',
    'CompanyId',
    'categoryId',
    'companyId',
    'publisherId',
    'UserId',
  ],
};

const getProducts = async (request, response) => {
  const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
  };

  const { page, size, search } = request.query;

  const { limit, offset } = getPagination(page, size);

  const orderAttr = [['id', 'DESC']];

  try {
    if (!search) {
      const products = await Product.findAndCountAll({
        include,
        order: orderAttr,
        attributes,
        offset,
        limit,
      });
      return response.status(200).json({
        products: products.rows,
        totalProducts: products.count,
        size: limit,
        page: offset,
        totalPages: Math.ceil(products.count / limit),
      });
    }

    const products = await Product.findAndCountAll({
      include,
      where: {
        [Op.or]: [
          { lote: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } },
        ],
      },
      order: orderAttr,
      attributes,
      offset,
      limit,
    });

    return response.status(200).json({
      products: products.rows,
      totalProducts: products.count,
      size: limit,
      page: offset,
      totalPages: Math.ceil(products.count / limit),
    });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {
      include,
      attributes,
    });
    if (!product) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

const getCategories = async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      attributes: ['id', 'name'],
    });
    if (!allCategories) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.status(200).json(allCategories);
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getCategories,
};
