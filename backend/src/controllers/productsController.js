const Category = require('../models/Category');
const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category }],
    });
    res.json(products);
  } catch (error) {
    res.send(error);
  }
};

const postProduct = async (req, res) => {
  try {
    const { name, photo, price, expirationDate, category } = req.body;
    console.log(name);
    const newProduct = await Product.create({
      name,
      photo,
      price,
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
