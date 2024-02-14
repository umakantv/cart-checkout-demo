const { Product } = require('../models/index.js');

const fetchAllProducts = async () => {
  const products = await Product.findAll();

  return products;
};

const fetchProductById = async (id) => {
  const product = await Product.findByPk(id);

  return product;
}



module.exports = { 
  fetchAllProducts,
  fetchProductById
}