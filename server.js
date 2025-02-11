const express = require('express'); // Import express
const app = express(); // Initialize express

// SWAGGER
require('./swagger');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const port = process.env.PORT || 3000; // Port number
// DATA
const models = require('./models');
const utils = require('./utils');

models.db.mongoose
  .connect(utils.url, {})
  .then(() => console.log('Mongoose connected through MongoDB!'))
  .catch((err) => console.error('Cannot connect to Mongodb', err));

// APP
app
  .use(express.json()) // Replaces bodyParser.json()
  .use(express.urlencoded({ extended: true })) // Replaces bodyParser.urlencoded()
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use('/', require('./routes'))
  .listen(port, () => console.log(`🚀 Server is running on port ${port}`));
