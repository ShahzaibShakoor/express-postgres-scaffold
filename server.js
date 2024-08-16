const dotenv = require('dotenv');
const path = require('path');
const { Sequelize } = require('sequelize');

process.on('uncaughtException', err => {
  console.log(`UNHANDLED EXCEPTION! Shutting down...`);
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({
  path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`),
});
const app = require('./src/app');

const db = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: process.env.DATABASE_DIALECT,
  },
);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

db.authenticate()
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    server.close(() => process.exit(1));
  });

process.on('unhandledRejection', err => {
  console.log(`UNHANDLED REJECTION! Shutting down...`);
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});
