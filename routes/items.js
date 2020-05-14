const express = require('express');
const router = express.Router();
const ItemSchema = require('../models/item');
const config = require('../config/database')
const Item = require('../models/item');

// Get all items
router.get(('/items'), (req, res) => {
    Item.getItems((err, items) => {
        if(err) {
            throw err;
        }
        res.json(items);
    });
});

// Get one item
router.get('/items/:_id', (req, res) => {
    Item.getItemById(req.params._id, (err, item) => {
        if(err) {
            throw err;
        }
        res.json(item);
    });
});

// Add one item
router.post('/items', (req, res) => {
    let newItem = {};
    newItem = new Item({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        imageUrl: req.body.imageUrl
    }); 
    Item.addItem(newItem, (err, item) => {
        if(err) {
            throw err;
        }
        res.json(item);
    });
});

// Delete one item

module.exports = router;