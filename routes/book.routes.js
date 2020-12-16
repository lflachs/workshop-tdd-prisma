const express = require('express');
const { getAllBooks, postNewBook } = require('../controllers/book.controller');
const router = express.Router();

router.get('/', getAllBooks);
router.post('/', postNewBook);

module.exports = router;
