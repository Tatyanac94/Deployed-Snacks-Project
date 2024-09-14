// api/index.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const serverless = require('serverless-http');
const apiKeyMiddleware = require('../middleware/apiKey');
const snacksRouter = require('../snacks'); // Adjust path if needed

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(apiKeyMiddleware);
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/snacks', snacksRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'welcome.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports.handler = serverless(app);
