const asyncHandler = require('express-async-handler');
const Category = require('../models/category');
const Item = require('../models/item');
const { body, validationResult } = require('express-validator');

const categoryValidation = [
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
];

// @desc    Get category form
// @route   GET /categories/new
// @route   GET /categories/:id/edit
// @access  Private
const categoryForm = asyncHandler(async (req, res) => {
  if (req.params.id) {
    const category = await Category.findById(req.params.id);

    res.status(200).render('categoryForm', { category });
  } else {
    res.status(200).render('categoryForm', { category: {} });
  }
});

// @desc    Create category
// @route   POST /categories/new
// @access  Private
const createCategory = [
  categoryValidation,
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

    const items = await Item.find({ category: category._id });

    res.status(200).render('category', { items, category });
  }),
];

// @desc    Get a single category
// @route   GET /categories/:id
// @access  Private
const readCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  const items = await Item.find({ category: req.params.id });

  if (!category) {
    res.status(400);
    throw new Error('Category not found');
  }

  res.status(200).render('category', { category, items });
});

// @desc    Get all categories
// @route   GET /categories
// @access  Private
const readAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  res.status(200).render('categories', { title: 'Categories', categories });
});

// @desc    Update category
// @route   POST /categories/:id/edit
// @access  Private
const updateCategory = [
  categoryValidation,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(500).json(errors);
      return;
    }

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

    const items = await Item.find({ category: req.params.id });

    res.status(200).render('category', { category: updatedCategory, items });
  }),
];

// @desc    Get category delete
// @route   GET /categories/:id/remove
// @access  Private
const deleteCheck = asyncHandler(async (req, res) => {
  if (req.params.id) {
    const category = await Category.findById(req.params.id);

    const items = await Item.find({ category: req.params.id });

    res.status(200).render('deleteCheck', { items, category });
  }
});

// @desc    Delete category
// @route   POST /categories/:id/remove
// @access  Private
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(400);
    throw new Error('Category not found');
  }

  const itemsInCategory = await Item.find({ category: req.params.id });

  if (itemsInCategory.length !== 0) {
    res.status(500);
    throw new Error('Cannot delete a category that has items');
  }

  await category.deleteOne();

  res.redirect('/categories');
});

module.exports = {
  categoryForm,
  createCategory,
  readCategory,
  readAllCategories,
  updateCategory,
  deleteCheck,
  deleteCategory,
};
