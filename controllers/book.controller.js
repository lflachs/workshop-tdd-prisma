const db = require('../db');
exports.getAllBooks = (req, res, next) => {
	db.book
		.findMany()
		.then((books) => res.status(200).json(books))
		.catch((err) => {
			throw new Error(err);
		});
};
exports.postNewBook = (req, res, next) => {
	console.log(req.body);
	const { title, description, cover, rate } = req.body;
	db.book
		.create({ data: { title, description, cover, rate } })
		.then((books) => res.status(200).json(books))
		.catch((err) => {
			throw new Error(err);
		});
};
