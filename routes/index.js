const express = require('express');
const bookRoutes = require('./book.routes');

const router = express.Router();

router.use('/book', bookRoutes);

router.get('/', (req, res) => {
	res.status(200).json({ message: 'Welcome to my Api', version: 0.1 });
});

module.exports = router;
