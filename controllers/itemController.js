const asyncHandler = require('express-async-handler');
const Item = require('../models/item');

// @desc    Create item
// @route   POST /items
// @access  Private
const createItem = asyncHandler(async (req, res) => {
  const { name, description, category, price, quantity } = req.body;

  //! We are assuming that 'category' is coming in as an id

  if (!name) {
    res.status(400);
    throw new Error('Please include a name');
  }

  if (!description) {
    res.status(400);
    throw new Error('Please include a description');
  }

  if (!category) {
    res.status(400);
    throw new Error('Please include a category');
  }

  if (!price) {
    res.status(400);
    throw new Error('Please include a price');
  }

  if (!quantity) {
    res.status(400);
    throw new Error('Please include a quantity');
  }

  const item = await Item.create({
    name,
    description,
    category,
    price,
    quantity,
  });

  res.status(200).json(item);
});

// @desc    Get a single item
// @route   GET /items/:id
// @access  Private
const readItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(400);
    throw new Error('Item not found');
  }

  res.status(200).json(item);
});

// @desc    Get all items
// @route   GET /items
// @access  Private
const readAllItems = asyncHandler(async (req, res) => {
  const items = await Item.find();

  res.status(200).json(items);
});

// @desc    Update item
// @route   PUT /items/:id
// @access  Private
const updateItem = asyncHandler(async (req, res) => {
  const { name, description, category, price, quantity } = req.body;

  //! We are assuming that 'category' is coming in as an id

  if (!name) {
    res.status(400);
    throw new Error('Please include a name');
  }

  if (!description) {
    res.status(400);
    throw new Error('Please include a description');
  }

  if (!category) {
    res.status(400);
    throw new Error('Please include a category');
  }

  if (!price) {
    res.status(400);
    throw new Error('Please include a price');
  }

  if (!quantity) {
    res.status(400);
    throw new Error('Please include a quantity');
  }
  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(400);
    throw new Error('Item not found');
  }

  const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedItem);
});

// @desc    Delete category
// @route   DELETE /items/:id
// @access  Private
const deleteCategory = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(400);
    throw new Error('Item not found');
  }

  await item.deleteOne();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  createItem,
  readItem,
  readAllItems,
  updateItem,
  deleteCategory,
};
