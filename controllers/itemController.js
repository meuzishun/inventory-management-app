const Item = require('../models/item');

const createItem = (req, res) => {
  res.send('Create a new item');
};

const readItem = (req, res) => {
  res.send(`Read item with id ${req.params.id}`);
};

const readAllItems = (req, res) => {
  res.send('Read all items');
};

const updateItem = (req, res) => {
  res.send(`Update item with id ${req.params.id}`);
};

const destroyItem = (req, res) => {
  res.send(`Delete item with id ${req.params.id}`);
};

module.exports = {
  createItem,
  readItem,
  readAllItems,
  updateItem,
  destroyItem,
};
