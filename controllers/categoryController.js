const asyncHandler = require('express-async-handler');
const Category = require('../models/category');
const Item = require('../models/item');
const { body, validationResult } = require('express-validator');

// @desc    Create category
// @route   POST /categories
// @access  Private
const createCategory = [
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
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(500).json(errors);
      return;
    }

    const category = await Category.create({
      name: req.body.name,
      description: req.body.description,
    });

    res.status(200).json(category);
  }),
];

// @desc    Get a single category
// @route   GET /categories/:id
// @access  Private
const readCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(400);
    throw new Error('Category not found');
  }

  res.status(200).json(category);
});

// @desc    Get all categories
// @route   GET /categories
// @access  Private
const readAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  res.status(200).json(categories);
});

// @desc    Update category
// @route   PUT /categories/:id
// @access  Private
const updateCategory = [
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
  asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);

    //? Is this necessary? 500 is thrown if findById doesn't work...
    if (!category) {
      res.status(400);
      throw new Error('Category not found');
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedCategory);
  }),
];

// @desc    Delete category
// @route   DELETE /categories/:id
// @access  Private
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  const itemsInCategory = await Item.find({ category: req.params.id });

  if (!category) {
    res.status(400);
    throw new Error('Category not found');
  }

  if (itemsInCategory.length !== 0) {
    res.status(500);
    throw new Error('Cannot delete a category that has items');
  }

  await category.deleteOne();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  createCategory,
  readCategory,
  readAllCategories,
  updateCategory,
  deleteCategory,
};