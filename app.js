const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Database connect
// Object sent is to use new versions and disable error messages
mongoose.connect(config.database, {useNewUrlParser: true, useUnifiedTopology: true});

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
const items = require('./routes/items');

// Port number
const port = process.env.NODE_ENV ? process.env.PORT || 8080 : 3000;

// CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser
app.use(bodyParser.json());

// Passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/items', items);

// Index route
app.get('/', (req, res) => {
    res.send('Invalid endpoint');
});

// Redirect any other route to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});

// Server start
app.listen(port, () => {
    console.log('Server started on port ' + port);
});