const request = require('supertest');
const app = require('../server');
const db = require('../db');
const faker = require('faker');
const createBookRecord = () => ({
	title: faker.lorem.words(3),
	description: faker.lorem.sentence(5),
	cover: faker.image.cats(300, 300),
	rate: faker.random.number(0, 5),
});
describe('Books endpoints', () => {
	beforeAll(async () => {
		await db.book.deleteMany({ where: { id: { not: 0 } } });
		await db.book.create({ data: createBookRecord() });
	});
	describe('GET endpoints', () => {
		it('GET /books should return some books', (done) => {
			return request(app)
				.get('/api/book')
				.expect(200)
				.expect('Content-Type', /json/)
				.then((response) => {
					expect(response.body.length).toBe(1);
					done();
				});
		});
	});
	describe('POST endpoints', () => {
		it('POST /book should create a book', (done) => {
			return request(app)
				.post('/api/book')
				.send({
					title: 'Hello',
					description: 'This is me youre looking for',
					cover: 'http://mycat.com',
					rate: 5,
				})
				.expect(200)
				.expect('Content-Type', /json/)
				.then((response) => {
					expect(response.body.title).toBe('Hello');
					done();
				});
		});
	});
});
