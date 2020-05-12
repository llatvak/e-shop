const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User schema
const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

// Get one user by id
module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

// Get one user by username
module.exports.getUserByEmail = function(email, callback) {
    const query = {email: email}
    User.findOne(query, callback);
}

// Hash use password and add one user
module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}