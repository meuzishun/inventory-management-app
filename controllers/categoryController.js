const Category = require('../models/category');

const createCategory = (req, res) => {
  res.send('Create a new category');
};

const readCategory = (req, res) => {
  res.send(`Read category with id ${req.params.id}`);
};

const readAllCategories = (req, res) => {
  res.send('Read all categories');
};

const updateCategory = (req, res) => {
  res.send(`Update category with id ${req.params.id}`);
};

const destroyCategory = (req, res) => {
  res.send(`Delete category with id ${req.params.id}`);
};

module.exports = {
  createCategory,
  readCategory,
  readAllCategories,
  updateCategory,
  destroyCategory,
};
