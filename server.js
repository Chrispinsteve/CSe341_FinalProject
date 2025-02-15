const express = require('express'); // Import express
const cors = require('cors'); // Import CORS for cross-origin requests
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
const userRoutes = require('./routes/userRoute'); // ✅ Added user routes

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
app.use(cors()); // Enable CORS for all routes (important for frontend requests)
app.use(express.json()); // Replaces bodyParser.json()
app.use(express.urlencoded({ extended: true })); // Replaces bodyParser.urlencoded()

// LOGGING MIDDLEWARE
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`); // Log request details
  next(); // Proceed to next middleware or route handler
});

// SWAGGER DOCS
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ROUTES
app.use('/api/aftermarket', aftermarketRoutes);
app.use('/api/user', userRoutes); // ✅ Added user routes
app.use('/', mainRoutes);

