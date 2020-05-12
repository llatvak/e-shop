const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Database connect
mongoose.connect(config.database, {useMongoClient: true});

// Check database connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

// On database connection error
mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err);
});

const app = express();

const users = require('./routes/users');

// Port number
const port = 3000;

// CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

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