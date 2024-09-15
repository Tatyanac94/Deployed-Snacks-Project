// const express = require('express');
// const path = require('path');
// const cors = require('cors');
// const serverless = require('serverless-http'); // For serverless deployment
// const apiKeyMiddleware = require('../middleware/apiKey'); // Middleware to handle API keys
// const snacksRouter = require('./snacks'); // Router for snacks-related endpoints

// const app = express();

// // Middleware
// app.use(apiKeyMiddleware);
// app.use(cors());
// app.use(express.json());
// app.use(express.static(path.join(__dirname, '../public')));

// // Routes for snacks
// app.use('/snacks', snacksRouter);

// // Error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
// });

// // Export for serverless deployment
// module.exports.handler = serverless(app);

// // Export app for testing or local development
// module.exports.app = app;



const express = require('express');
const router = express.Router();

// Import the snacks router
const snacksRouter = require('./snacks');

// Use the snacks router for routes starting with /snacks
router.use('/snacks', snacksRouter);

module.exports = router;
