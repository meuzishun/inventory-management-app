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
    // .not()
    // .isDecimal()
    // .withMessage('Quantity must be an integer.')
    .isInt({ min: 0 })
    .withMessage('Quantity cannot be negative.'),
];

// @desc    Get item form
// @route   GET /items/new
// @route   GET /items/:id/edit
// @access  Private
const itemForm = asyncHandler(async (req, res) => {
  if (req.params.id) {
    const item = await Item.findById(req.params.id).populate('category');
    // res.status(200).json(item);
    res.render('itemForm', { item });
  } else {
    res.status(200).json({ title: 'create item' });
  }
});

// @desc    Create item
// @route   POST /items
// @access  Private
const createItem = [
  itemValidation,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(500).json(errors);
      return;
    }

    const { name, description, category, price, quantity } = req.body;

    // if (!name) {
    //   res.status(400);
    //   throw new Error('Please include a name');
    // }

    // if (!description) {
    //   res.status(400);
    //   throw new Error('Please include a description');
    // }

    // if (!category) {
    //   res.status(400);
    //   throw new Error('Please include a category');
    // }

    // if (!price) {
    //   res.status(400);
    //   throw new Error('Please include a price');
    // }

    // if (!quantity) {
    //   res.status(400);
    //   throw new Error('Please include a quantity');
    // }

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

  console.log(item);
  // res.status(200).json(item);
  res.status(200).render('item', { item });
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
const updateItem = [
  itemValidation,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(500).json(errors);
      return;
    }

    const { name, description, category, price, quantity } = req.body;

    // if (!name) {
    //   res.status(400);
    //   throw new Error('Please include a name');
    // }

    // if (!description) {
    //   res.status(400);
    //   throw new Error('Please include a description');
    // }

    // if (!category) {
    //   res.status(400);
    //   throw new Error('Please include a category');
    // }

    // if (!price) {
    //   res.status(400);
    //   throw new Error('Please include a price');
    // }

    // if (!quantity) {
    //   res.status(400);
    //   throw new Error('Please include a quantity');
    // }
    // const item = await Item.findById(req.params.id);

    // if (!item) {
    //   res.status(400);
    //   throw new Error('Item not found');
    // }

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

    const priceNumber = Number(price);
    const quantityNumber = Number(quantity);

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        category: categoryId,
        // price: priceNumber,
        price,
        // quantity: quantityNumber,
        quantity,
      },
      {
        new: true,
      }
    ).populate('category');

    console.log(updatedItem);
    // res.status(200).json(updatedItem);
    res.status(200).render('item', { item: updatedItem });
  }),
];

// @desc    Get item delete
// @route   GET /items/:id/remove
// @access  Private
const deleteCheck = asyncHandler(async (req, res) => {
  if (req.params.id) {
    const item = await Item.findById(req.params.id);
    res.status(200).json(item);
  }
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
  itemForm,
  createItem,
  readItem,
  readAllItems,
  updateItem,
  deleteCheck,
  deleteCategory,
};
