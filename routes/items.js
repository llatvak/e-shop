const express = require('express');
const router = express.Router();
const ItemSchema = require('../models/item');
const config = require('../config/database')
const Item = require('../models/item');

// Get all items
router.get(('/'), async (req, res) => {
    try {
        const items = await Item.find();
        if(items === null) {
            res.status(404).json({msg: 'Items not found'});
        } else {
            res.status(200).json(items); 
        }
    } catch(err) {
        res.json({msg: err});
    }
});

// Get one item
router.get('/:_id', async (req, res) => {
    try {
        const item = await Item.findById(req.params._id);
        res.status(200).json({message: 'Item not found'});
    } catch(err) {
        res.json({msg: err});
    }
});

// Add one item
router.post('/', async (req, res) => {
    const item = new Item({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        imageUrl: req.body.imageUrl
    });
    try {
        const savedItem = await item.save();
        res.status(201).json(savedItem);
    } catch(err) {
        res.status(400).json({message: err});
    }
});

// Update one item
router.put('/:_id', (req, res) => {
    let updatedItem = {};
    updatedItem = new Item({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        imageUrl: req.body.imageUrl
    });
    Item.updateItem(updatedItem, (err, item) => {
        if(err) {
            throw err;
        }
        res.json(item);
    });
});

// Delete one item
router.delete('/:_id', async (req, res) => {
    try {
        const removedItem =  await Item.remove({_id: req.params._id});
        res.status(200).json(removedItem);
    } catch(err) {
        res.status(404).json({message: err});
    }
});

module.exports = router;