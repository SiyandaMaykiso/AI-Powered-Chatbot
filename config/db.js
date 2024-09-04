// Load environment variables from .env file
require('dotenv').config();

const { Sequelize } = require('sequelize');

// Check if DATABASE_URL is set in environment variables
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in the environment variables.');
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false, // Set to true if you want to see SQL queries in the console
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // This is important for Heroku
    },
  },
});

module.exports = sequelize;
