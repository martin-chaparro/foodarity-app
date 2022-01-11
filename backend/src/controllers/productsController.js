const { Op } = require('sequelize');
const Category = require('../models/Category');
const Product = require('../models/Product');
const User = require('../models/User');
const Company = require('../models/Company');

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

    const attributes = {
      where: whereAttr,
      include: [
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
      ],
      order: orderAttr,
      attributes: {
        exclude: [
          'createdAt',
          'updatedAt',
          'CategoryId',
          'CompanyId',
          'categoryId',
          'companyId',
        ],
      },
    };

    if (size) {
      attributes.limit = size;
      attributes.offset = (page - 1) * size;
    }

    const products = await Product.findAll(attributes);
    const count = await Product.count(attributes);
    delete attributes.limit;
    delete attributes.offset;
    const totalCount = await Product.count(attributes);
    const pages = Math.ceil(count / size);
    res.json({
      products,
      totalProducts: totalCount,
      page: parseInt(page, 10) || 1,
      pages: pages || 1,
    });
  } catch (error) {
    res.send(error);
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
    return res.json(newProduct);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const cancelPublication = async (req, res) => {
  // TODO auth de que el que la esta cancelando sea quien lo publico
  try {
    const { id } = req.params;
    const product = await Product.update(
      {
        status: 'canceled',
      },
      {
        where: { id },
      }
    );
    res.json(product);
  } catch (error) {
    res.send(error);
  }
};

const getCompanyProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findAll({ where: { CompanyId: id } }); // TODO terminar de conectar cuando este conectado con companies
    res.json(products);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getProducts,
  postProduct,
  cancelPublication,
  getCompanyProducts,
};
