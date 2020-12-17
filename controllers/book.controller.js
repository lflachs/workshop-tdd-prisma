const db = require('../db');
exports.getAllBooks = (req, res, next) => {
	return db.book
		.findMany()
		.then((books) => res.status(200).json(books))
		.catch((err) => {
			throw new Error(err);
		});
};
exports.postNewBook = (req, res, next) => {
	console.log(req.body);
	const { title, description, cover, rate } = req.body;
	return db.book
		.create({ data: { title, description, cover, rate } })
		.then((books) => res.status(200).json(books))
		.catch((err) => {
			throw new Error(err);
		});
};
exports.updateBook = (req, res, next) => {
	const { title, description, cover, rate } = req.body;
	const id = Number(req.params.id);
	return db.book
		.update({ where: { id }, data: { title, description, cover, rate } })
		.then((book) => res.status(200).json(book))
		.catch((err) => {
			console.log(err);
			throw new Error(err);
		});
};
exports.deleteBook = (req, res, next) => {
	const id = Number(req.params.id);
	return db.book
		.delete({ where: { id } })
		.then((book) => res.status(200).json(book))
		.catch((err) => {
			console.log(err);
			throw new Error(err);
		});
};
