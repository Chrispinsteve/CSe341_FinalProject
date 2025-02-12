const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const brands = require('./models/brandsModel');
const Vehicle = require('./models/vehicleModel');
const Part = require('./models/partsModel');
const User = require('./models/userModel');

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
    console.error("Error: MONGODB_URI is undefined. Check your .env file.");
    process.exit(1); // Exit the process if URI is missing
}

mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch(err => console.error('Database connection error:', err));

const seedDatabase = async () => {
    try {
        await mongoose.connection.dropDatabase(); // Clears the database before seeding

        // Seed brands
        const brands = await brands.insertMany([
            { name: 'Toyota', country: 'Japan', startingDate: new Date('1937-08-28'), headquarters: 'Toyota City, Japan', founders: ['Kiichiro Toyoda'] },
            { name: 'Ford', country: 'USA', startingDate: new Date('1903-06-16'), headquarters: 'Dearborn, Michigan, USA', founders: ['Henry Ford'] }
        ]);

        // Seed Vehicles
        const vehicles = await Vehicle.insertMany([
            { Name: 'Corolla', brands: brands[0]._id, Year: 2022, Type: 'Sedan', Description: 'Reliable and fuel-efficient', Engine_type: 'Inline-4', Fuel_type: 'Gasoline', Transmission: 'Automatic', colors_available: ['Red', 'Blue', 'Black'] },
            { Name: 'F-150', brands: brands[1]._id, Year: 2023, Type: 'Truck', Description: 'Powerful work truck', Engine_type: 'V8', Fuel_type: 'Gasoline', Transmission: 'Automatic', colors_available: ['White', 'Black', 'Silver'] }
        ]);

        // Seed Parts
        const parts = await Part.insertMany([
            { Name: 'Brake Pads', brands: brands[0]._id, Vehicles: [vehicles[0]._id], Quality: 'OEM' },
            { Name: 'Oil Filter', brands: brands[1]._id, Vehicles: [vehicles[1]._id], Quality: 'Aftermarket' }
        ]);

        // Seed Users
        const users = await User.insertMany([
            { UserName: 'admin1', Email: 'admin@example.com', FirstName: 'John', LastName: 'Doe', AccountType: 'Admin', PhoneNumber: '555-1234', PasswordHash: 'hashedpassword' },
            { UserName: 'user1', Email: 'user@example.com', FirstName: 'Jane', LastName: 'Smith', AccountType: 'User', PhoneNumber: '555-5678', PasswordHash: 'hashedpassword' }
        ]);

        console.log('Database seeded successfully ✅');
        mongoose.connection.close();
    } catch (err) {
        console.error('Error seeding database:', err);
        mongoose.connection.close();
    }
};

seedDatabase();
