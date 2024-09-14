// api/index.js
require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const snacksRouter = require('./snacks');
const apiKeyMiddleware = require('../middleware/apiKey');

const app = express();

// Apply API key middleware
app.use(apiKeyMiddleware);

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Route handling
app.use('/snacks', snacksRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'welcome.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Export the express app to be used by Vercel
module.exports = app;
