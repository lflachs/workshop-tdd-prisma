const express = require('express');
const PORT = process.env.PORT || 3000;
const router = require('./routes');
const app = express();

app.use('/api', router);

app.get('*', (req, res, next) => {
	res.status(404).json({ message: 'Page not found' });
});
if (process.env.NODE_ENV !== 'test') {
	app.listen(PORT, () => {
		console.log(`App is running on ${PORT}`);
	});
}

module.exports = app;
