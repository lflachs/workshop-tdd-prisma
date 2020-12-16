const request = require('supertest');
const app = require('../server');

describe('/api', () => {
	it('GET /api should returns the api version', (done) => {
		return request(app)
			.get('/api')
			.expect(200)
			.expect('Content-Type', /json/)
			.then((response) => {
				expect(response.body.version).toBe(0.1);
				done();
			});
	});
});

describe('/404', () => {
	it('GET /404 should returns page not found', (done) => {
		return request(app)
			.get('/404')
			.expect(404)
			.expect('Content-Type', /json/)
			.then((response) => {
				expect(response.body.message).toBe('Page not found');
				done();
			});
	});
});
