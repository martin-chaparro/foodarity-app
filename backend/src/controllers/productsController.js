const { Op } = require('sequelize');
const Category = require('../models/Category');
const Product = require('../models/Product');
const User = require('../models/User');
const Company = require('../models/Company');

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
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  },
  {
    model: User,
    as: 'publisher',
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'password'],
    },
  },
]
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
}

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
      whereAttr['$Category.name$'] = categoryName;
    }
    if (categoryId) {
      whereAttr['$Category.id$'] = categoryId;
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
    res.json({
      products,
      totalProducts: totalCount,
      page: parseInt(page, 10) || 1,
      pages: pages || 1,
    });
  } catch (error) {
    res.status(500).send(error);
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
      return res.json({ msg: 'El usuaria no posee un comercio' });
    }
    if (user.Company.type_id !== 1) {
      return res.json({
        msg: 'Solo las companias tipo comercio pueden publicar productos',
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
    return res.json(newProduct);
  } catch (error) {
    return res.status(500).send(error);
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
      return res.json({ msg: 'Tu compania no publico este producto' });
    }
    if (product.status !== 'published') {
      return res.json({
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
    return res.json({ msg: 'success', data: product });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getCompanyProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findAll({
      where: { CompanyId: id, status: 'published' },
      order: [['id', 'DESC']],
      include,
      attributes,
    });
    res.json(products);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getCompanyProductsByAuth = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findByPk(userId);
    const id = user.CompanyId;
    console.log(id);
    const products = await Product.findAll({
      where: { CompanyId: id },
      order: [['id', 'DESC']],
      include,
      attributes,
    });
    res.json(products);
  } catch (error) {
    res.status(500).send(error);
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
      return res.status(404).json({ msg: 'Not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).send(error);
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
