const express = require('express');
const {
	getAllBooks,
	postNewBook,
	updateBook,
	deleteBook,
} = require('../controllers/book.controller');
const router = express.Router();

router.get('/', getAllBooks);
router.post('/', postNewBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
