const mongoose = require('mongoose');
const config = require('../config/database');

// Item schema
const ItemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});

const Item = module.exports = mongoose.model('Item', ItemSchema);