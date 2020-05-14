const express = require('express');
const router = express.Router();
const UserSchema = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database')
const User = require('../models/user');

// Register user
router.post('/register', (req, res, next) => {
    const email = req.body.email;
    User.getUserByEmail(email, (err, user) => {
        if(err) {
            throw err;
        }
        if(user) {
            res.json({success: false, msg: 'Email already exists'});
        }
        if(!user) {
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
            
        }
    });
});

// Authenticate user
router.post('/authenticate', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.getUserByEmail(email, (err, user) => {
        if(err) throw err;
        if(!user) {
            return res.json({success: false, msg: 'User not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            // If password matches
            if(isMatch) {
                const token = jwt.sign({data: user}, config.secret, {
                    expiresIn: 604800 // Expires in one week
                });
                res.json({
                    success: true,
                    token: 'Bearer ' + token,
                    // Send back profile data of logged in user
                    user: {
                        id: user._id,
                        email: user.email
                    }
                })
            } else {
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    });
});

// User profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});

module.exports = router;