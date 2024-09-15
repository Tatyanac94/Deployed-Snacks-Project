// const express = require('express');
// const router = express.Router();

// // Import the snacks router
// const snacksRouter = require('./snacks');

// // Use the snacks router for routes starting with /snacks
// router.use('/snacks', snacksRouter);

// module.exports = router;









const express = require('express');
const router = express.Router();

// Import the snacks router
const snacksRouter = require('./snacks');

// Use the snacks router for routes starting with /snacks
router.use('/snacks', snacksRouter);

module.exports = router;
