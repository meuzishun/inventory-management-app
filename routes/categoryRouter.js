const express = require('express');
const router = express.Router();
const {
  categoryForm,
  createCategory,
  readCategory,
  readAllCategories,
  updateCategory,
  deleteCheck,
  deleteCategory,
} = require('../controllers/categoryController');

router.route('/').get(readAllCategories);
router.route('/new').get(categoryForm).post(createCategory);
router.route('/:id').get(readCategory);
router.route('/:id/edit').get(categoryForm).post(updateCategory);
router.route('/:id/remove').get(deleteCheck).post(deleteCategory);

module.exports = router;
