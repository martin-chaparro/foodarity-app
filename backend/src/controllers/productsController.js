const Category = require('../models/Category');
const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const { size } = req.query;
    const page = req.query.page || 0;
    let products;
    if (size) {
      products = await Product.findAll({
        include: [{ model: Category }],
        order: [['id', 'ASC']],
        limit: size,
        offset: page * size,
      });
    } else {
      products = await Product.findAll({
        include: [{ model: Category }],
        order: [['id', 'ASC']],
      });
    }
    res.json(products);
  } catch (error) {
    res.send(error);
  }
};

const postProduct = async (req, res) => {
  try {
    const {
      lote,
      description,
      photo,
      price,
      publicationDate,
      expirationDate,
      category,
    } = req.body;
    const newProduct = await Product.create({
      lote,
      description,
      photo,
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

module.exports = { getProducts, postProduct };
