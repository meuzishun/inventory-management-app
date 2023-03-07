const express = require('express');
const router = express.Router();
const {
  createCategory,
  readCategory,
  readAllCategories,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');

router.route('/').get(readAllCategories).post(createCategory);
router
  .route('/:id')
  .get(readCategory)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
