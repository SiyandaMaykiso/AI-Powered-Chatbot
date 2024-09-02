// config/config.js

const { Sequelize } = require('sequelize');

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
