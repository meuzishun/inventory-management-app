const Category = require('../models/category');

// @desc    Create category
// @route   POST /categories
// @access  Private
const createCategory = (req, res) => {
  res.send('Create a new category');
};

// @desc    Get a single category
// @route   GET /categories/:id
// @access  Private
const readCategory = (req, res) => {
  res.send(`Read category with id ${req.params.id}`);
};

// @desc    Get all categories
// @route   GET /categories
// @access  Private
const readAllCategories = (req, res) => {
  res.send('Read all categories');
};

// @desc    Update category
// @route   PUT /categories/:id
// @access  Private
const updateCategory = (req, res) => {
  res.send(`Update category with id ${req.params.id}`);
};

// @desc    Delete category
// @route   DELETE /categories/:id
// @access  Private
const deleteCategory = (req, res) => {
  res.send(`Delete category with id ${req.params.id}`);
};

module.exports = {
  createCategory,
  readCategory,
  readAllCategories,
  updateCategory,
  deleteCategory,
};
