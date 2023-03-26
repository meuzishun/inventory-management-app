const express = require('express');
const router = express.Router();
const {
  newCategoryForm,
  createCategory,
  readCategory,
  readAllCategories,
  editCategoryForm,
  updateCategory,
  deleteCheck,
  deleteCategory,
} = require('../controllers/categoryController');

router.route('/').get(readAllCategories);
router.route('/new').get(newCategoryForm).post(createCategory);
router.route('/:id').get(readCategory);
router.route('/:id/edit').get(editCategoryForm).post(updateCategory);
router.route('/:id/remove').get(deleteCheck).post(deleteCategory);

module.exports = router;
