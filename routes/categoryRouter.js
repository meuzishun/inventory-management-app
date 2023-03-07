const express = require('express');
const router = express.Router();
const {
  createCategory,
  readCategory,
  readAllCategories,
  updateCategory,
  destroyCategory,
} = require('../controllers/categoryController');

router.route('/').get(readAllCategories).post(createCategory);
router
  .route('/:id')
  .get(readCategory)
  .put(updateCategory)
  .delete(destroyCategory);

module.exports = router;
