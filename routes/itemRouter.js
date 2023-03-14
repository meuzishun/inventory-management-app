const express = require('express');
const router = express.Router();
const {
  itemForm,
  createItem,
  readItem,
  readAllItems,
  updateItem,
  deleteCheck,
  deleteCategory,
} = require('../controllers/itemController');

router.route('/').get(readAllItems);
router.route('/new').get(itemForm).post(createItem);
router.route('/:id').get(readItem);
router.route('/:id/edit').get(itemForm).post(updateItem);
router.route('/:id/remove').get(deleteCheck).delete(deleteCategory);

module.exports = router;
