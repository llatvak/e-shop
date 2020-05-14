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

// Get one item by id
module.exports.getItemById = function(id, callback) {
    Item.findById(id, callback);
}

// Get all items
module.exports.getItems = function(callback) {
    Item.find(callback);
}

// Add one item
module.exports.addItem = function(newItem, callback) {
    newItem.save(callback);
}

// Modify one item
module.exports.updateItem = function(updatedItem, callback) {
    Item
        .findOneAndUpdate({ 
            name: updatedItem.name,
            price: updatedItem.price,
            category: updatedItem.category,
            imageUrl: updatedItem.imageUrl
        }, callback);
}

// Delete one item
module.exports.comparePassword = function(id, callback) {
    Item.deleteOne(id, callback);
}