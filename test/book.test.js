// require('dotenv.config')
const db = require('../db');
const { exec } = require('child_process');

const request = require('supertest');
const app = require('../server');
const faker = require('faker');

const createBookRecord = () => ({
	title: faker.lorem.words(3),
	description: faker.lorem.sentence(5),
	cover: faker.image.cats(300, 300),
	rate: faker.random.number(0, 5),
});
describe('Books endpoints', () => {
	beforeEach(async (done) => {
		await db
			.$queryRaw(`DROP DATABASE IF EXISTS ${process.env.DB_NAME_TEST}`)
			.catch();

		return exec(`npm run migrate:test`, (err) => {
			if (err) {
				throw new Error(err.message);
			}
			return done();
		});
	});
	afterAll((done) => {
		db.$disconnect();
		done();
	});

	describe('GET endpoints', () => {
		it('GET /books should return some books', async (done) => {
			let { id } = await db.book.create({ data: createBookRecord() });
			let response = await request(app)
				.get('/api/book')
				.expect(200)
				.expect('Content-Type', /json/);
			expect(response.body.length).toBe(1);
			expect(response.body[0].id).toBe(id);
			done();
		});
	});
	describe('POST endpoints', () => {
		it('POST /book should create a book', async (done) => {
			const response = await request(app)
				.post('/api/book')
				.send({
					title: 'Hello',
					description: 'This is me youre looking for',
					cover: 'http://mycat.com',
					rate: 5,
				})
				.expect(200)
				.expect('Content-Type', /json/);
			expect(response.body.title).toBe('Hello');
			expect(response.body.description).toBe('This is me youre looking for');
			expect(response.body.cover).toBe('http://mycat.com');
			expect(response.body.rate).toBe(5);
			done();
		});
	});
});
