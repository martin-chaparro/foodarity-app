const { Op } = require('sequelize');
const Category = require('../models/Category');
const Product = require('../models/Product');

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
    const page = req.query.page || 0;
    const whereAttr = { status: 'published' };
    const orderAttr = [['id', 'ASC']];

    if (order && (order === 'ASC' || order === 'DESC')) {
      orderAttr.unshift(['price', order]);
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
      include: [{ model: Category }],
      order: orderAttr,
    };

    if (size) {
      attributes.limit = size;
      attributes.offset = (page - 1) * size;
    }

    const products = await Product.findAll(attributes);
    const count = await Product.count();
    const pages = Math.ceil(count / size);
    res.json({ products, page: parseInt(page, 10) || 1, pages: pages || 1 });
  } catch (error) {
    res.send(error);
  }
};

const postProduct = async (req, res) => {
  // TODO auth de company que publica y guardar el id
  try {
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
    res.json(newProduct);
  } catch (error) {
    res.send(error);
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
