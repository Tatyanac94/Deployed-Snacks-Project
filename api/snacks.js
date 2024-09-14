const express = require('express');
const createSnackHandler = require('./createSnack');
const deleteSnackHandler = require('./deleteSnack');
const getSnacksHandler = require('./getSnacks');
const getSnackByIdHandler = require('./getSnacksById');
const updateSnackHandler = require('./updateSnack');

const router = express.Router();

router.get('/', getSnacksHandler);
router.get('/:id', getSnackByIdHandler);
router.post('/', createSnackHandler);
router.put('/:id', updateSnackHandler);
router.delete('/:id', deleteSnackHandler);

module.exports = router;
