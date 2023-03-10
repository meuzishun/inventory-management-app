const asyncHandler = require('express-async-handler');
const Item = require('../models/item');
const Category = require('../models/category');

// @desc    Create item
// @route   POST /items
// @access  Private
const createItem = asyncHandler(async (req, res) => {
  const { name, description, category, price, quantity } = req.body;

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

  //* Use this if category is id
  // const item = await Item.create({
  //   name,
  //   description,
  //   category,
  //   price,
  //   quantity,
  // });

  //* Use this if category is text
  const foundCategory = await Category.findOne({ name: category });
  if (!foundCategory) {
    res.status(400);
    throw new Error('Not a pre-existing category');
  }
  const categoryId = foundCategory._id.toString();

  const item = await Item.create({
    name,
    description,
    category: categoryId,
    price,
    quantity,
  });

  res.status(200).json(item);
});

// @desc    Get a single item
// @route   GET /items/:id
// @access  Private
const readItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id).populate('category');

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
  const items = await Item.find().populate('category');

  res.status(200).json(items);
});

// @desc    Update item
// @route   PUT /items/:id
// @access  Private
const updateItem = asyncHandler(async (req, res) => {
  const { name, description, category, price, quantity } = req.body;

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

  //* Use this if category is id
  // const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
  //   new: true,
  // });

  //* Use this if category is text
  const foundCategory = await Category.findOne({ name: category });
  if (!foundCategory) {
    res.status(400);
    throw new Error('Not a pre-existing category');
  }
  const categoryId = foundCategory._id.toString();

  const updatedItem = await Item.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      category: categoryId,
      price,
      quantity,
    },
    {
      new: true,
    }
  );

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
