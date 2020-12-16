const request = require('supertest');
const app = require('../server');
const db = require('../db');

describe('Books endpoints', () => {
	describe('GET endpoints', () => {
		it('GET /books should return some books', (done) => {
			return request(app)
				.get('/api/books')
				.expect(200)
				.expect('Content-Type', /json/)
				.then((response) => {
					expect(response.body.length).toBe(1);
					done();
				});
		});
	});
});
