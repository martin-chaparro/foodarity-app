const { Op } = require('sequelize');
const Category = require('../models/Category');
const Product = require('../models/Product');
const User = require('../models/User');
const Company = require('../models/Company');
const Address = require('../models/Address');
const State = require('../models/State');
const City = require('../models/City');

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

const getProducts = async (req, res) => {
  try {
    const {
      lote,
      categoryName,
      categoryId,
      minPrice,
      maxPrice,
      expirationDate,
      order,
      size,
    } = req.query;
    const page = req.query.page || 1;
    const whereAttr = { status: 'published' };
    const orderAttr = [['id', 'ASC']];

    switch (order) {
      case 'priceASC':
        orderAttr.unshift(['price', 'ASC']);
        break;
      case 'priceDESC':
        orderAttr.unshift(['price', 'DESC']);
        break;
      case 'expirationASC':
        orderAttr.unshift(['expirationDate', 'ASC']);
        break;
      case 'expirationDESC':
        orderAttr.unshift(['expirationDate', 'DESC']);
        break;
      default:
        break;
    }
    if (lote) {
      whereAttr.lote = { [Op.iLike]: `%${lote}%` };
    }
    // TODO corroborar como buscar por relacion de entidades
    if (categoryName) {
      include[0].where = {
        name: categoryName,
      };
    }
    if (categoryId) {
      include[0].where = {
        id: categoryId,
      };
    }

    if (minPrice && maxPrice) {
      whereAttr.price = { [Op.between]: [minPrice, maxPrice] };
    } else if (minPrice) {
      whereAttr.price = { [Op.gte]: minPrice };
    } else if (maxPrice) {
      whereAttr.price = { [Op.lte]: maxPrice };
    }
    if (expirationDate) {
      whereAttr.expirationDate = { [Op.lte]: expirationDate };
    }

    const params = {
      where: whereAttr,
      include,
      order: orderAttr,
      attributes,
    };

    if (size) {
      params.limit = size;
      params.offset = (page - 1) * size;
    }

    const products = await Product.findAll(params);
    const count = await Product.count(params);
    delete params.limit;
    delete params.offset;
    const totalCount = await Product.count(params);
    const pages = Math.ceil(count / size);
    res.status(200).json({
      products,
      totalProducts: totalCount,
      page: parseInt(page, 10) || 1,
      pages: pages || 1,
    });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const postProduct = async (req, res) => {
  // TODO auth de company que publica y guardar el id
  try {
    const { userId } = req;
    const user = await User.findByPk(userId, {
      include: [{ model: Company }],
    });
    if (!user.CompanyId) {
      return res.status(401).json({ msg: 'El usuaria no posee un comercio' });
    }
    if (user.Company.type_id !== 1) {
      return res.status(401).json({
        msg: 'Solo las companias tipo comercio pueden publicar productos',
      });
    }
    if (user.Company.status !== 'Habilitada') {
      return res.status(401).json({
        msg: 'Solo los comercios habilitados pueden publicar productos',
      });
    }

    const {
      lote,
      description,
      photo,
      quantity,
      price,
      publicationDate,
      expirationDate,
      category,
    } = req.body;
    const newProduct = await Product.create({
      lote,
      description,
      photo,
      quantity,
      price,
      publicationDate,
      expirationDate,
      status: 'published',
    });
    await newProduct.setCategory(category);
    await newProduct.setCompany(user.Company);
    await newProduct.setPublisher(userId);
    return res.status(200).json(newProduct);
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

const deletePublication = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findByPk(userId, {
      include: [{ model: Company }],
    });
    const { id } = req.params;
    let product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ msg: 'Not found' });
    }

    if (product.companyId !== user.CompanyId) {
      return res
        .status(401)
        .json({ msg: 'Tu compania no publico este producto' });
    }
    if (product.status !== 'published') {
      return res.status(401).json({
        msg: 'No puedes borrar un producto que ya no esta publicado',
      });
    }
    await Product.update(
      {
        status: 'canceled',
      },
      {
        where: { id },
      }
    );
    product = await Product.findByPk(id);
    return res.status(200).json({ msg: 'success', data: product });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

const getCompanyProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByPk(id);
    if (!company) {
      return res.status(404).json({ message: 'Not found' });
    }
    const products = await Product.findAll({
      where: { CompanyId: id, status: 'published' },
      order: [['id', 'DESC']],
      include,
      attributes,
    });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

const getCompanyProductsByAuth = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findByPk(userId);
    const id = user.CompanyId;
    const company = await Company.findByPk(id);
    console.log(company.type_id);
    if (!company) {
      return res.status(401).json({ message: 'No posees una compania' });
    }
    if (company.type_id !== 1) {
      return res.status(401).json({ message: 'No posees un comercio' });
    }
    const products = await Product.findAll({
      where: { CompanyId: id },
      order: [['id', 'DESC']],
      include,
      attributes,
    });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).send({ message: error });
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

module.exports = {
  getProducts,
  postProduct,
  deletePublication,
  getCompanyProductsById,
  getProductById,
  getCompanyProductsByAuth,
};
