const Item = require('../models/item');

// @desc    Create item
// @route   POST /items
// @access  Private
const createItem = (req, res) => {
  res.send('Create a new item');
};

// @desc    Get a single item
// @route   GET /items/:id
// @access  Private
const readItem = (req, res) => {
  res.send(`Read item with id ${req.params.id}`);
};

// @desc    Get all items
// @route   GET /items
// @access  Private
const readAllItems = (req, res) => {
  res.send('Read all items');
};

// @desc    Update item
// @route   PUT /items/:id
// @access  Private
const updateItem = (req, res) => {
  res.send(`Update item with id ${req.params.id}`);
};

// @desc    Delete category
// @route   DELETE /items/:id
// @access  Private
const deleteCategory = (req, res) => {
  res.send(`Delete item with id ${req.params.id}`);
};

module.exports = {
  createItem,
  readItem,
  readAllItems,
  updateItem,
  deleteCategory,
};
