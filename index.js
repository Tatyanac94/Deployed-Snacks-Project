require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const path = require('path');
const cors = require('cors');
const apiRouter = require('./api/index'); // Import API routes
const apiKeyMiddleware = require('./middleware/apiKey'); // Import API key middleware

const app = express();
const PORT = process.env.PORT || 4000;

// Apply API key middleware to all API routes
app.use(apiKeyMiddleware);

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Use API routes
app.use('/api', apiRouter);

// Serve static files for the root page and /snacks
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'welcome.html'));
});

app.get('/snacks', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'snacks.html'));
});

// Error handling middleware for 404 and 500 errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.use((req, res, next) => {
    res.status(404).json({
        error: "Resource not found. Are you sure you're looking in the right place?",
    });
});

// Start server locally if not in production
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

// Export the app for serverless deployment (used by Vercel)
module.exports = app;
