const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();

const users = require('./routes/users');

// Port number
const port = 3000;

// CORS
app.use(cors());

// Body Parser
app.use(bodyParser.json());

app.use('/users', users);

// Index route
app.get('/', (req, res) => {
    res.send('Invalid endpoint');
});

// Server start
app.listen(port, () => {
    console.log('Server started on port ' + port);
});