const express = require('express'); // Import express
const app = express(); // Initialize express

// SWAGGER
require('./swagger');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// PORT
const port = process.env.PORT || 3000;

// DATABASE & MODELS
const models = require('./models');
const utils = require('./utils');

// ROUTES
const aftermarketRoutes = require('./routes/aftermarketRoutes');
const mainRoutes = require('./routes');

// MONGOOSE CONNECTION
models.db.mongoose
  .connect(utils.url, {})
  .then(() => {
    console.log('✅ Mongoose connected through MongoDB!');
    
    // START SERVER ONLY AFTER DB CONNECTION
    app.listen(port, () => console.log(`🚀 Server is running on port ${port}`));
  })
  .catch((err) => {
    console.error('❌ Cannot connect to MongoDB', err);
    process.exit(1); // Exit if DB connection fails
  });

// MIDDLEWARES
app.use(express.json()); // Replaces bodyParser.json()
app.use(express.urlencoded({ extended: true })); // Replaces bodyParser.urlencoded()

// SWAGGER DOCS
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ROUTES
app.use('/api/aftermarket', aftermarketRoutes);
app.use('/', mainRoutes);
