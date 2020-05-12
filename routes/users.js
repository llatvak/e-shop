const express = require('express');
const router = express.Router();
const UserSchema = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

// Register user
router.post('/register', (req, res, next) => {
    let newUser = new User({
        email: req.body.email,
        password: req.body.password
    });

    User.addUser(newUser, (err) => {
        if(err) {
            res.json({success: false, msg: 'Failed to register user'});
        } else {
            res.json({success: true, msg: 'User registered'});
        }
    });
});

// Authenticate user
router.post('/authenticate', (req, res, next) => {
    res.send('AUTHENTICATE');
});

// User profile
router.get('/profile', (req, res, next) => {
    res.send('PROFILE');
});

module.exports = router;