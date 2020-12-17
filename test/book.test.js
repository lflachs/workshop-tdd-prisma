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

		exec(`npm run migrate:test`, (err) => {
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
	describe('PUT endpoints', () => {
		it('PUT /book/:id should update a book', async (done) => {
			const newBook = await request(app)
				.post('/api/book')
				.send({
					title: 'Hello',
					description: 'This is me youre looking for',
					cover: 'http://mycat.com',
					rate: 5,
				})
				.expect(200)
				.expect('Content-Type', /json/);
			const updatedBook = await request(app)
				.put(`/api/book/${newBook.body.id}`)
				.send({
					title: 'Hi',
					description: 'This is not me',
					cover: 'http://mydog.com',
					rate: 2,
				})
				.expect(200)
				.expect('Content-Type', /json/);
			expect(updatedBook.body.title).toBe('Hi');
			expect(updatedBook.body.description).toBe('This is not me');
			expect(updatedBook.body.cover).toBe('http://mydog.com');
			expect(updatedBook.body.rate).toBe(2);
			done();
		});
	});
});

describe('DELETE endpoints', () => {
	it('DELETE /book/:id should delete a book', async (done) => {
		const newBook = await request(app)
			.post('/api/book')
			.send({
				title: 'Hello',
				description: 'This is a bad post',
				cover: 'http://badPicturee.com',
				rate: 0,
			})
			.expect(200)
			.expect('Content-Type', /json/);
		const deletedBook = await request(app)
			.delete(`/api/book/${newBook.body.id}`)
			.expect(200)
			.expect('Content-Type', /json/);
		const bookInDb = await db.book.findMany({ where: { id: newBook.body.id } });

		expect(bookInDb.length).toBe(0);
		done();
	});
});
