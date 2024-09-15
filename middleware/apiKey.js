// // middleware/apiKey.js
// const API_KEY = process.env.API_KEY;

// function apiKeyMiddleware(req, res, next) {
//     const apiKey = req.headers['api-key'];
//     if (apiKey === API_KEY) {
//         next();
//     } else {
//         res.status(403).json({ error: 'Forbidden: Invalid API key' });
//     }
// }

// module.exports = apiKeyMiddleware;

