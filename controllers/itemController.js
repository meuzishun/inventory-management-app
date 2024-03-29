const asyncHandler = require('express-async-handler');
const Item = require('../models/item');
const Category = require('../models/category');
const { body, validationResult } = require('express-validator');

const itemValidation = [
  body('name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Please include a name.'),
  body('description')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Please include a description.'),
  //* Change 'category' validation if id
  // body('category')
  //   .isMongold(),
  body('category')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Please include a category.'),
  body('price')
    .isCurrency()
    .withMessage('Please make sure price is a currency'),
  body('quantity')
    .isInt({ min: 0 })
    .withMessage('Please include a non-negative quantity.'),
];

// @desc    Get new item form
// @route   GET /items/new
// @access  Private
const newItemForm = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.status(200).render('newItemForm', { categories });
});

// @desc    Create item
// @route   POST /items
// @access  Private
const createItem = [
  itemValidation,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(200).render('itemError', { errors: errors.errors });
      return;
    }

    //* Use this if category is id
    //* ===================================
    // const { name, description, category, price, quantity } = req.body;
    //* ===================================

    //* Use this if category is text
    //* ===================================
    const {
      name,
      description,
      category: categoryText,
      price,
      quantity,
    } = req.body;

    const foundCategory = await Category.findOne({ name: categoryText });

    if (!foundCategory) {
      res.status(400);
      throw new Error('Not a pre-existing category');
    }

    const category = foundCategory._id.toString();
    //* ===================================

    const item = await Item.create({
      name,
      description,
      category,
      price,
      quantity,
    });

    res.status(200).render('item', { item });
  }),
];

// @desc    Get a single item
// @route   GET /items/:id
// @access  Private
const readItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id).populate('category');

  if (!item) {
    res.status(400);
    throw new Error('Item not found');
  }

  res.status(200).render('item', { item });
});

// @desc    Get all items
// @route   GET /items
// @access  Private
const readAllItems = asyncHandler(async (req, res) => {
  const items = await Item.find().populate('category');
  res.status(200).render('items', { title: 'Items', items });
});

// @desc    Get edit item form
// @route   GET /items/:id/edit
// @access  Private
const editItemForm = asyncHandler(async (req, res) => {
  const categories = await Category.find({});

  if (req.params.id) {
    const item = await Item.findById(req.params.id).populate('category');
    res.status(200).render('editItemForm', { item, categories });
  }
});

// @desc    Update item
// @route   POST /items/:id
// @access  Private
const updateItem = [
  itemValidation,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(500).json(errors);
      return;
    }

    //* Use this if category is id
    //* ===================================
    // const { name, description, category, price, quantity } = req.body;
    //* ===================================

    //* Use this if category is text
    //* ===================================
    const {
      name,
      description,
      category: categoryText,
      price,
      quantity,
    } = req.body;

    const foundCategory = await Category.findOne({ name: categoryText });

    if (!foundCategory) {
      res.status(400);
      throw new Error('Not a pre-existing category');
    }

    const category = foundCategory._id.toString();
    //* ===================================

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        category,
        price,
        quantity,
      },
      {
        new: true,
      }
    ).populate('category');

    res.status(200).render('item', { item: updatedItem });
  }),
];

// @desc    Get item delete
// @route   GET /items/:id/remove
// @access  Private
const deleteCheck = asyncHandler(async (req, res) => {
  if (req.params.id) {
    const item = await Item.findById(req.params.id);
    res.status(200).render('deleteItemCheck', { item });
  }
});

// @desc    Delete item
// @route   DELETE /items/:id
// @access  Private
const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  const categoryId = item.category;

  if (!item) {
    res.status(400);
    throw new Error('Item not found');
  }

  await item.deleteOne();
  res.status(200).redirect(`/categories/${categoryId}`);
});

module.exports = {
  newItemForm,
  createItem,
  readItem,
  readAllItems,
  editItemForm,
  updateItem,
  deleteCheck,
  deleteItem,
};
