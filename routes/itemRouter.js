const express = require('express');
const router = express.Router();
const {
  newItemForm,
  createItem,
  readItem,
  readAllItems,
  editItemForm,
  updateItem,
  deleteCheck,
  deleteCategory,
  deleteItem,
} = require('../controllers/itemController');

router.route('/').get(readAllItems);
router.route('/new').get(newItemForm).post(createItem);
router.route('/:id').get(readItem);
router.route('/:id/edit').get(editItemForm).post(updateItem);
router.route('/:id/remove').get(deleteCheck).post(deleteItem);

module.exports = router;
