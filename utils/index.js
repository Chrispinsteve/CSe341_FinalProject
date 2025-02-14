const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  url: process.env.MONGODB_URI, // Change from DB_URL to MONGODB_URI
  database: process.env.DATABASE,
};
