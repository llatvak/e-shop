const express = require('express');
const router = express.Router();
const ItemSchema = require('../models/item');
const config = require('../config/database')
const Item = require('../models/item');

// Get all items
router.get(('/items'), function(req, res) {
    Item.getItems((err, items) => {
        if(err) {
            throw err;
        }
        res.json(items);
    });
});

// Update one item

// Delete one item

module.exports = router;