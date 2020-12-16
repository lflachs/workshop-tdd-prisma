const { config } = require('dotenv');
config({ path: process.env.NODE_ENV !== 'test' ? '.env.dev' : '.env.test' });

const { PrismaClient } = require('@prisma/client');

module.exports = new PrismaClient();
