const express = require('express');
const router = express.Router();
const {
  createItem,
  readItem,
  readAllItems,
  updateItem,
  destroyItem,
} = require('../controllers/itemController');

router.route('/').get(readAllItems).post(createItem);
router.route('/:id').get(readItem).put(updateItem).delete(destroyItem);

module.exports = router;
