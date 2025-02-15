const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const Brand = require('./models/brandsModel');
const Vehicle = require('./models/vehicleModel');
const Part = require('./models/partsModel');
const CarDealerFranchise = require('./models/CarDealerFranchise');
const User = require('./models/userModel');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB like seed.js
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ Mongoose connected to MongoDB!');
        seedDatabase(); // Seed data when server starts
        app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
    })
    .catch((err) => {
        console.error('❌ Cannot connect to MongoDB', err);
        process.exit(1);
    });

// Seed function like in seed.js
const seedDatabase = async () => {
    try {
        await mongoose.connection.dropDatabase(); // Clear DB before seeding
        console.log('Database cleared.');

        // Seed brands
        const brands = await Brand.insertMany([
            { name: 'Toyota', country: 'Japan', startingDate: new Date('1937-08-28'), headquarters: 'Toyota City, Japan', founders: ['Kiichiro Toyoda'] },
            { name: 'Ford', country: 'USA', startingDate: new Date('1903-06-16'), headquarters: 'Dearborn, Michigan, USA', founders: ['Henry Ford'] }
        ]);
        console.log('Brands seeded:', brands);

        // Seed vehicles with correct references
        const toyotaId = brands[0]._id;
        const fordId = brands[1]._id;
        const vehicles = await Vehicle.insertMany([
            { Name: 'Corolla', Brand: toyotaId, Year: 2022, Type: 'Sedan', Description: 'Reliable and fuel-efficient', Engine_type: 'Inline-4', Fuel_type: 'Gasoline', Transmission: 'Automatic', colors_available: ['Red', 'Blue', 'Black'] },
            { Name: 'F-150', Brand: fordId, Year: 2023, Type: 'Truck', Description: 'Powerful work truck', Engine_type: 'V8', Fuel_type: 'Gasoline', Transmission: 'Automatic', colors_available: ['White', 'Black', 'Silver'] }
        ]);
        console.log('Vehicles seeded:', vehicles);

        // Seed users
        const users = await User.insertMany([
            { UserName: 'admin1', Email: 'admin@example.com', FirstName: 'John', LastName: 'Doe', AccountType: 'Admin', PhoneNumber: '555-1234', PasswordHash: 'hashedpassword' },
            { UserName: 'user1', Email: 'user@example.com', FirstName: 'Jane', LastName: 'Smith', AccountType: 'User', PhoneNumber: '555-5678', PasswordHash: 'hashedpassword' }
        ]);
        console.log('Users seeded:', users);

        // Seed Car Dealer Franchises
        const carDealerFranchises = await CarDealerFranchise.insertMany([
            { name: 'AutoNation Toyota', brand: toyotaId, address: '123 Main St', city: 'Los Angeles', state: 'CA', country: 'USA', phoneNumber: '555-123-4567', emails: ['contact@autonationtoyota.com'] },
            { name: 'Ford Dealership', brand: fordId, address: '456 Ford St', city: 'Detroit', state: 'MI', country: 'USA', phoneNumber: '555-987-6543', emails: ['contact@forddealership.com'] }
        ]);
        console.log('Car Dealer Franchises seeded:', carDealerFranchises);

        console.log('Database seeding completed successfully.');
    } catch (err) {
        console.error('Error seeding database:', err);
    }
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes (you can add your routes here)
app.use('/api/aftermarket', require('./routes/aftermarketRoutes'));
app.use('/api/user', require('./routes/userRoute'));
app.use('/', require('./routes'));

// Logging Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`);
    next();
});
