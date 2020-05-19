const express = require('express');
const router = express.Router();
const ItemSchema = require('../models/item');
const config = require('../config/database')
const Item = require('../models/item');

// Get all items
router.get(('/'), async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items); 
    } catch(err) {
        res.status(404).json({msg: err});
    }
});

// Get one item
router.get('/:_id', async (req, res) => {
    try {
        const item = await Item.findById(req.params._id);
        if(item === null) {
            res.status(404).json({msg: 'Item not found'});
        } else {
            res.status(200).json(item); 
        }
    } catch(err) {
        res.status(400).send({error: err.message});
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
router.patch('/:_id', async(req, res) => {
    try {
        const updatedItem = await Item.updateOne({_id: req.params._id},
        {
            $set: {
                name: req.body.name,
                price: req.body.price,
                category: req.body.category,
                imageUrl: req.body.imageUrl
            }
        });
        res.status(200).json(updatedItem);
    } catch(err) {
        res.status(400).json({message: err});
    }
});

// Delete one item
router.delete('/:_id', async (req, res) => {
    try {
        const removedItem =  await Item.deleteOne({_id: req.params._id});
        res.status(200).json(removedItem);
    } catch(err) {
        res.status(404).json({message: err});
    }
});

module.exports = router;