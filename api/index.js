const express = require('express');
const router = express.Router();

const snacksRouter = require('./snacks');

router.use('/snacks', snacksRouter);

module.exports = router;
