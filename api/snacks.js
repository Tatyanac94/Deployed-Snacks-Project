// api/snacks.js
const express = require('express');
const getSnacksHandler = require('./getSnacks');
const getSnackByIdHandler = require('./getSnacksById');
const createSnackHandler = require('./createSnack');
const updateSnackHandler = require('./updateSnack');  // Ensure this file exists
const deleteSnackHandler = require('./deleteSnack');

const router = express.Router();

router.get('/', getSnacksHandler);
router.get('/:id', getSnackByIdHandler);
router.post('/', createSnackHandler);
router.put('/:id', updateSnackHandler);
router.delete('/:id', deleteSnackHandler);

module.exports = router;
