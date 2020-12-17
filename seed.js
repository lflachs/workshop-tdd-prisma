const { config } = require('dotenv');
config({ path: process.env.NODE_ENV !== 'test' ? '.env.dev' : '.env.test' });

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
	await prisma.book.deleteMany({});

	const grace = await prisma.book.create({
		data: {
			title: 'test',
			description: 'test',
			cover: 'test',
			rate: 5,
		},
	});
}

main();
